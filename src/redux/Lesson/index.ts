import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const removeLesson = createAsyncThunk('lessons/removeLesson', async (id: number) => {
    await axios.delete(`lessons/${id}`);
    return id;
});
