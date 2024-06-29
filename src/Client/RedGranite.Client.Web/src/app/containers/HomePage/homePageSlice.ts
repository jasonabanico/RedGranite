import { createSlice } from '@reduxjs/toolkit';
import { IHomePageState } from './types';

const initialState: IHomePageState = {
    items: [],
}

const HomePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addItem: (state, action) => {
            state.items?.push(action.payload);
        }
    }
});

export const { setItems, addItem } = HomePageSlice.actions;
export default HomePageSlice.reducer;