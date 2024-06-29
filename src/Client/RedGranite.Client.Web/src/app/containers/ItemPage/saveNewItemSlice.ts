import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itemService from '../../services/itemService';
import { ItemInput } from '../../../../__generated__/globalTypes';

interface SaveNewItemState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SaveNewItemState = {
    status: 'idle',
    error: null
};

export const saveNewItem = createAsyncThunk(
    'itemPage/saveNewItem',
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

const saveNewItemSlice = createSlice({
    name: 'saveNewItem',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveNewItem.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(saveNewItem.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(saveNewItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Failed to save new item';
            })
    }
});

export default saveNewItemSlice.reducer;