import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itemService from '../../services/itemService';
import { ItemInput } from '../../../../__generated__/globalTypes';

interface SaveExistingItemState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SaveExistingItemState = {
    status: 'idle',
    error: null
};

export const saveExistingItem = createAsyncThunk(
    'itemPage/saveExistingItem',
    async (itemInput: ItemInput, { rejectWithValue }) => {
        try {
            const data = await itemService
                .updateItem(itemInput);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
)

const saveExistingItemSlice = createSlice({
    name: 'saveExistingItem',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveExistingItem.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(saveExistingItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(saveExistingItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Failed to save existing item';
            })
    }
});

export default saveExistingItemSlice.reducer;