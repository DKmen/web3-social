import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


interface User {
    user: string[],
    follower: string[]
}

const initialState: User = {
    user: [],
    follower: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<string>) => {
            state.user = [...state.user, action.payload];
        },
        loadUser: (state, action: PayloadAction<string[]>) => {
            state.user = action.payload
        },
        addFollower: (state, action: PayloadAction<string>) => {
            state.follower = [...state.follower, action.payload];
        },
        loadFollower: (state, action: PayloadAction<string[]>) => {
            state.follower = action.payload
        },
    },
})

export const selectUser = (state: RootState) => state.user
export const { addUser, loadUser, addFollower, loadFollower } = userSlice.actions
export default userSlice.reducer;