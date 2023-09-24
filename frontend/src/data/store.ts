import { configureStore } from '@reduxjs/toolkit'
import postSlice from './slice/post'
import userSlice from './slice/user'


export const store = configureStore({
    reducer: {
        post: postSlice,
        user: userSlice
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch