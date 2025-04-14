import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itemService from '../../../services/items';
import { ItemInput } from '../../../../__generated__/globalTypes';
import { IAddItemFormState as IAddItemFormState } from './types';

const initialState: IAddItemFormState = {
    status: 'idle',
    error: null
};

export const addItem = createAsyncThunk(
    'itemPage/addItem',
    async (itemInput: ItemInput, { rejectWithValue }) => {
        try {
            const data = await itemService
                .addItem(itemInput);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
)

const addItemFormSlice = createSlice({
    name: 'addItemForm',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addItem.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(addItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Failed to save new item';
            })
    }
});

export default addItemFormSlice.reducer;