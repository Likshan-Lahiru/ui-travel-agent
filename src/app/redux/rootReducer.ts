import { combineReducers } from '@reduxjs/toolkit'
import chatReducer from '../features/chat/chatSlice'
import itineraryReducer from '../features/itinerary/itinerarySlice'
import userReducer from '../features/user/userSlice'
export const rootReducer = combineReducers({
    chat: chatReducer,
    itinerary: itineraryReducer,
    user: userReducer,
})
