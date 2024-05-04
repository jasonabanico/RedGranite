import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ItemState {
    name: string
    description: string
}

const initialState: ItemState = {
    name: '',
    description: ''
}

export const itemSlice = createSlice({
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