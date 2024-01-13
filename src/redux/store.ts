import { configureStore } from '@reduxjs/toolkit';
import lesson from './Lesson';
import user from './User';
import group from './Group';
import card from './Card';

export const store = configureStore({
    reducer: {
        lesson,
        user,
        group,
        card,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
