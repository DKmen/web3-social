import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface IPost {
    sender: string,
    message: string
}

interface Post {
    post: IPost[]
}

const initialState: Post = {
    post: []
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<IPost>) => {
            state.post = [...state.post, action.payload];
        },
        loadPost: (state, action: PayloadAction<IPost[]>) => {
            state.post = action.payload;
        }
    },
})

export const selectPost = (state: RootState) => state.post.post
export const { addPost, loadPost } = postSlice.actions
export default postSlice.reducer;