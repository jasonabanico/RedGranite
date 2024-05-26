import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface initialState {
    name: string
    description: string
}

const initialState: ItemState = {
    name: '',
    description: ''
}

export const ItemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        updateName: (state, name) => {
            state.name = state;
        },
        updateDescription: (state, description) => {
            state.description = description;
        }
    }
});

export const {} = ItemSlice.actions;
export default ItemSlice.reducer;