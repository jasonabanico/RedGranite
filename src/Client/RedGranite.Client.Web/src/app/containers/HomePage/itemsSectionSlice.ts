import { createSlice } from '@reduxjs/toolkit';
import { IItemsSectionState as IItemsSectionState } from './types';

const initialState: IItemsSectionState = {
    initialLoad: true,
    page: 1,
    items: [],
}

const ItemsSectionSlice = createSlice({
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

export const { setItems, setPage, resetInitialLoad, addItem } = ItemsSectionSlice.actions;
export default ItemsSectionSlice.reducer;