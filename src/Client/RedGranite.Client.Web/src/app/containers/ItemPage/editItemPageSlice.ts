import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itemService from '../../services/itemService';
import { ItemInput } from '../../../../__generated__/globalTypes';
import { IEditItemPageState } from './types';

const initialState: IEditItemPageState = {
    status: 'idle',
    error: null,
    item: null
};

export const updateItem = createAsyncThunk(
    'editItemPage/updateItem',
    async (itemInput: ItemInput, { rejectWithValue }) => {
        try {
            const data = await itemService.updateItem(itemInput);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Unknown error');
        }
    }
);

const editItemPageSlice = createSlice({
    name: 'editItemPage',
    initialState,
    reducers: {
        setItem: (state, action) => {
            state.item = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateItem.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = typeof action.payload === 'string' ? action.payload : 'Failed to save existing item';
            });
    }
});

export const { setItem } = editItemPageSlice.actions;
export default editItemPageSlice.reducer;