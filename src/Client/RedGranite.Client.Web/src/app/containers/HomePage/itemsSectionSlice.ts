import { createSlice } from '@reduxjs/toolkit';
import { IItemsSectionState as IItemsSectionState } from './types';

const initialState: IItemsSectionState = {
    initialLoad: true,
    page: 1,
    items: [],
}

const itemsSectionSlice = createSlice({
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
        saveItem: (state, action) => {
            state.items?.unshift(action.payload);
        }
    }
});

export const { setItems, setPage, resetInitialLoad, saveItem } = itemsSectionSlice.actions;
export default itemsSectionSlice.reducer;