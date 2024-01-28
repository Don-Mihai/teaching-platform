import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserState, IUser, PAuth, ROLES } from './types';

const initialState: UserState = {
    user: {} as IUser,
    users: [],
    listeners: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            localStorage.setItem('userId', String(action.payload.id));
            state.user = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(auth.fulfilled, (state, action) => {
                state.user = action.payload || ({} as IUser);
            })
            .addCase(getListeners.fulfilled, (state, action) => {
                state.listeners = action.payload || [];
            });
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const get = createAsyncThunk('user/get', async (): Promise<IUser[] | undefined> => {
    const user = (await axios.get('users')).data;

    return user;
});

export const getListeners = createAsyncThunk('user/getListeners', async (): Promise<IUser[] | undefined> => {
    const user = (await axios.get(`http://localhost:3001/users?role=${ROLES.STUDENT}`)).data;

    return user;
});

export const getById = createAsyncThunk('user/getById', async (cardId: number): Promise<IUser[] | undefined> => {
    const user = (await axios.get(`users/${cardId}`)).data;

    return user;
});

export const auth = createAsyncThunk('user/auth', async (payload: PAuth): Promise<IUser | undefined> => {
    const user = (await axios.get(`users?email=${payload.email}&password=${payload.password}`)).data[0];

    return user;
});
