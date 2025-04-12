import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itemService from '../../services/itemService';
import { ItemInput } from '../../../../__generated__/globalTypes';
import { IAddItemPageState } from './types';

const initialState: IAddItemPageState = {
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

const addItemPageSlice = createSlice({
    name: 'addItemPage',
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

export default addItemPageSlice.reducer;