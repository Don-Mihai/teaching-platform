import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GroupsState, IGroup, PUploadVideo } from './types';
import { BASE_URL } from '../../utils/types';

const initialState: GroupsState = {
    groups: [],
};

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(get.fulfilled, (state, action) => {
            state.groups = action.payload || [];
        });
    },
});

export const {} = groupSlice.actions;

export default groupSlice.reducer;

export const get = createAsyncThunk('groups/get', async (): Promise<IGroup[] | undefined> => {
    const groups = (await axios.get(BASE_URL + 'groups')).data;

    return groups;
});

export const edit = createAsyncThunk('groups/edit', async (payload: any): Promise<IGroup[] | undefined> => {
    const group = (await axios.put(BASE_URL + `groups/${payload?.id}`, payload)).data;

    return group;
});

export const uploadVideo = createAsyncThunk('lessons/removeLesson', async (ojb: PUploadVideo) => {
    const accessToken = ojb.token;
    const url = 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&uploadType=resumable';
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Length': ojb.video.size,
        'X-Upload-Content-Type': ojb.video.type,
    };

    try {
        // Инициировать процесс загрузки и получить URL для загрузки
        const response = await axios.post(
            url,
            {
                snippet: {
                    title: ojb.title || 'Test Video Title',
                    description: 'Test Video Description',
                },
                status: {
                    privacyStatus: 'public', // или 'public' или 'unlisted'
                    selfDeclaredMadeForKids: false,
                },
            },
            {
                headers: headers,
            }
        );
        const uploadUrl = response.headers.location;

        // Загрузить файл видео
        const res = await axios.put(uploadUrl, ojb.video, {
            headers: {
                'Content-Type': ojb.video.type,
                'Content-Length': ojb.video.size,
            },
        });

        return res.data.id;
    } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed');
    }
});
