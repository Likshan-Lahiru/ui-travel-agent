import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface UserState {
    name: string
    avatar: string
    currency: string
}
const initialState: UserState = {
    name: 'Layla',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    currency: 'LKR',
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrency: (state, action: PayloadAction<string>) => {
            state.currency = action.payload
        },
    },
})
export const { setCurrency } = userSlice.actions
export default userSlice.reducer
