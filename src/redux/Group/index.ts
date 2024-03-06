import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IGroup {
    teacherId: number;
    students: number[];
    name: string;
}

export interface GroupsState {
    groups: IGroup[];
}

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

// eslint-disable-next-line no-empty-pattern
export const {} = groupSlice.actions;

export default groupSlice.reducer;

export const get = createAsyncThunk('groups/get', async (): Promise<IGroup[] | undefined> => {
    const groups = (await axios.get('lessons')).data;

    return groups;
});
