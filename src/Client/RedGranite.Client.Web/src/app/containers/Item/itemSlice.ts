import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itemService from '../../services/itemService';
import { ItemInput } from '../../../../__generated__/globalTypes';

export const addItem = createAsyncThunk(
    'itemPage/addItem',
    async (itemInput: ItemInput) => {
        return await itemService
            .addItem(itemInput)
            .catch((err: any) => {
                console.log("Error:", err);
            });
    },
)

const itemSlice = createSlice({
    name: 'itemPage',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addItem.pending, (state, action) => {})
            .addCase(addItem.fulfilled, (state, action) => {})
            .addCase(addItem.rejected, (state, action) => {})
    }
});

export default itemSlice.reducer;