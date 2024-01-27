import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ILesson, LessonState, PLesson } from './types';
import { format } from 'date-fns';
import { calculateModuleNumber } from '../../utils/utils';

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
export const { } = lessonSlice.actions;

export default lessonSlice.reducer;

export const getLessons = createAsyncThunk('lesson/get', async (): Promise<ILesson[] | undefined> => {
    const lessons = (await axios.get('lessons')).data;

    return lessons;
});

export const createLesson = createAsyncThunk('lesson/create', async (user: any): Promise<undefined> => {
    const currentDate = format(new Date(), 'dd-MM-yyyy HH:mm');

    const lessons = (await axios.get('lessons')).data;

    const payload: PLesson = {
        teacherId: user.id,
        createDate: currentDate,
        title: currentDate,
        moduleId: calculateModuleNumber(lessons.length),
        groupId: user.groupId,
    };
    axios.post('lessons', payload);
});


