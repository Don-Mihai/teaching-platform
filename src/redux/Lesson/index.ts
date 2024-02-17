import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ILesson, LessonState, PLesson, PUploadVideo } from './types';
import { format } from 'date-fns';
import { calculateModuleNumber } from '../../utils/utils';

const initialState: LessonState = {
    lessons: [],
};

export const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {},

    extraReducers(builder) {
        builder.addCase(getLessons.fulfilled, (state, action) => {
            state.lessons = action.payload || [];
        });
    },
});

export default lessonSlice.reducer;

export const getLessons = createAsyncThunk('lesson/get', async (): Promise<ILesson[]> => {
    const lessons = (await axios.get('lessons')).data;
    return lessons;
});

export const createLesson = createAsyncThunk('lesson/create', async (user: any): Promise<ILesson> => {
    const currentDate = format(new Date(), 'dd-MM-yyyy HH:mm');

    const lessons = (await axios.get('lessons')).data;

    const payload: PLesson = {
        teacherId: user.id,
        createDate: currentDate,
        title: currentDate,
        moduleId: calculateModuleNumber(lessons.length),
        groupId: user.groupId,
    };
    const response = await axios.post('lessons', payload);
    return response.data;
});

export const editLesson = createAsyncThunk('lesson/create', async (lesson: any): Promise<ILesson> => {
    const payload: PLesson = {
        ...lesson,
    };
    const response = await axios.put('lessons', payload);
    return response.data;
});

export const removeLesson = createAsyncThunk('lessons/removeLesson', async (id: number) => {
    await axios.delete(`lessons/${id}`);
    return id;
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
                    title: 'Test Video Title',
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

        console.log('res', response.data, res.data);

        await axios.put(`lessons/${ojb.lessonId}`, { urlVideo: res.data.id });

        alert('Video uploaded successfully!');
    } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed');
    }
});
