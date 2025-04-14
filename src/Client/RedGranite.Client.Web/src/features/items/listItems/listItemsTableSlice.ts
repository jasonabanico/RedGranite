import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itemService from '../../../services/items';
import { IListItemsTableState as IListItemsTableState } from './types';

const initialState: IListItemsTableState = {
    initialLoad: true,
    page: 1,
    items: [],
}

export const deleteItem = createAsyncThunk(
    'itemPage/deleteItem',
    async (id: string, { rejectWithValue }) => {
        try {
            // Call the delete method from your service which deletes the item.
            await itemService.deleteItem(id);
            // Return the ID so the slice can remove it from state.
            return id;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);

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