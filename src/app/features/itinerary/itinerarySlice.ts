import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface Destination {
    id: string
    name: string
    price: number
    currency: string
    imageUrl: string
}
interface ItineraryState {
    destinations: Destination[]
    selectedDestination: string | null
}
const initialState: ItineraryState = {
    destinations: [
        {
            id: '1',
            name: 'Thailand',
            price: 113753,
            currency: 'LKR',
            imageUrl:
                'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1479&q=80',
        },
        {
            id: '2',
            name: 'Maldives',
            price: 127371,
            currency: 'LKR',
            imageUrl:
                'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
        },
        {
            id: '3',
            name: 'Italy',
            price: 340307,
            currency: 'LKR',
            imageUrl:
                'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        },
        {
            id: '4',
            name: 'Greece',
            price: 239324,
            currency: 'LKR',
            imageUrl:
                'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
        },
        {
            id: '5',
            name: 'Iceland',
            price: 368412,
            currency: 'LKR',
            imageUrl:
                'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        },
    ],
    selectedDestination: null,
}
const itinerarySlice = createSlice({
    name: 'itinerary',
    initialState,
    reducers: {
        setSelectedDestination: (state, action: PayloadAction<string | null>) => {
            state.selectedDestination = action.payload
        },
    },
})
export const { setSelectedDestination } = itinerarySlice.actions
export default itinerarySlice.reducer
