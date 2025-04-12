import { createSlice } from '@reduxjs/toolkit';
import { IListItemsPageState as IListItemsPageState } from './types';

const initialState: IListItemsPageState = {
    initialLoad: true,
    page: 1,
    items: [],
}

const listItemsPageSlice = createSlice({
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

export const { setItems, setPage, resetInitialLoad, saveItem } = listItemsPageSlice.actions;
export default listItemsPageSlice.reducer;