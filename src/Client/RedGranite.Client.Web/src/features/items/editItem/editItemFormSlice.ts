import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itemService from '../../../services/items';
import { ItemInput } from '../../../../__generated__/globalTypes';
import { IEditItemFormState } from './types';

const initialState: IEditItemFormState = {
    status: 'idle',
    error: null,
    item: null
};

export const updateItem = createAsyncThunk(
    'editItemForm/updateItem',
    async (itemInput: ItemInput, { rejectWithValue }) => {
        try {
            const data = await itemService.updateItem(itemInput);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Unknown error');
        }
    }
);

const editItemFormSlice = createSlice({
    name: 'editItemForm',
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

export const { setItem } = editItemFormSlice.actions;
export default editItemFormSlice.reducer;