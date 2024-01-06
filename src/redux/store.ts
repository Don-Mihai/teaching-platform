import { configureStore } from '@reduxjs/toolkit';
import lessonReducer from './Lesson';

export const store = configureStore({
    reducer: {
        lesson: lessonReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
