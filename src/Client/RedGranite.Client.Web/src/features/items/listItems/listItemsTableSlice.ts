import { createSlice } from '@reduxjs/toolkit';
import { IListItemsTableState as IListItemsTableState } from './types';

const initialState: IListItemsTableState = {
    initialLoad: true,
    page: 1,
    items: [],
}

const listItemsTableSlice = createSlice({
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

export const { setItems, setPage, resetInitialLoad, saveItem } = listItemsTableSlice.actions;
export default listItemsTableSlice.reducer;