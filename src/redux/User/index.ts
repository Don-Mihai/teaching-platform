import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
    id: number;
}

export interface UserState {
    user: IUser;
    userId: string;
}

const initialState: UserState = {
    user: {} as IUser,
    userId: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // increment: state => {
        //     state.value = 5;
        // },
        setUserId: (state, action: PayloadAction<number>) => {
            localStorage.setItem('userId', String(action.payload));
            state.userId = String(action.payload);
        },
    },
});

export const { setUserId } = userSlice.actions;

export default userSlice.reducer;
