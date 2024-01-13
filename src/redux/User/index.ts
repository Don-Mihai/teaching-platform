import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ILesson } from '../../pages/Lessons';
import axios from 'axios';

export interface IUser {
    id: number;
}

export interface UserState {
    user: IUser;
}

const initialState: UserState = {
    user: {} as IUser,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // increment: state => {
        //     state.value += 1;
        // },
        setUser: (state, action: PayloadAction<IUser>) => {
            localStorage.setItem('userId', String(action.payload.id));
            state.user = action.payload
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const get = createAsyncThunk('user/get', async (): Promise<IUser[] | undefined> => {
    const user = (await axios.get('http://localhost:3001/user')).data

    return user;
});

export const getById = createAsyncThunk('user/getById', async (cardId: number): Promise<IUser[] | undefined> => {
    const user = (await axios.get(`http://localhost:3001/user/${cardId}`)).data

    return user;
});
