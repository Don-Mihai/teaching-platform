import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IGroup {
    teacher: number;
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

export const {} = groupSlice.actions;

export default groupSlice.reducer;

export const get = createAsyncThunk('groups/get', async (): Promise<IGroup[] | undefined> => {
    const groups = (await axios.get('lessons')).data;

    return groups;
});
