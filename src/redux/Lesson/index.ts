import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ILesson, LessonState } from './types';

const initialState: LessonState = {
    lessons: [],
};

export const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        // increment: state => {
        //     state.value = 5;
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
    extraReducers(builder) {
        builder.addCase(getLessons.fulfilled, (state, action) => {
            state.lessons = action.payload || [];
        });
    },
});

// Action creators are generated for each case reducer function
export const {} = lessonSlice.actions;

export default lessonSlice.reducer;

export const getLessons = createAsyncThunk('lesson/get', async (): Promise<ILesson[] | undefined> => {
    const lessons = (await axios.get('lessons')).data;

    return lessons;
});
