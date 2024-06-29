import { createSlice } from '@reduxjs/toolkit';
import { IHomePageState } from './types';

const initialState: IHomePageState = {
    initialLoad: true,
    page: 1,
    items: [],
}

const HomePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
            state.initialLoad = false;
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        resetInitialLoad(state) {
            state.initialLoad = false;
        },
        addItem: (state, action) => {
            state.items?.push(action.payload);
        }
    }
});

export const { setItems, setPage, resetInitialLoad, addItem } = HomePageSlice.actions;
export default HomePageSlice.reducer;