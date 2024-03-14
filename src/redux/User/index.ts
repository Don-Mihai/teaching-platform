import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserState, IUser } from './types';

const initialState: UserState = {
  user: {} as IUser,
  token: '',
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
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('id_token', action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload || {};
    });
  },
});

export const { setUser, addToken } = userSlice.actions;

export default userSlice.reducer;

export const get = createAsyncThunk('user/get', async (): Promise<IUser[] | undefined> => {
  const user = (await axios.get('users')).data;

  return user;
});

export const getById = createAsyncThunk('user/getById', async (userId?: number): Promise<IUser[] | undefined> => {
  const id = localStorage.getItem('userId') || String(userId);
  const user = (await axios.get(`users/${id}`)).data;

  return user;
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (accessToken: string) => {
  const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
    headers: {
      Authorization: `Bearer ${accessToken || localStorage.getItem('id_token')}`,
    },
  });
  return response.data;
});
