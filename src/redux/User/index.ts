import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
        //     state.value = 5;
        // },
        setUser: (state, action: PayloadAction<IUser>) => {
            localStorage.setItem('userId', String(action.payload.id));
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
