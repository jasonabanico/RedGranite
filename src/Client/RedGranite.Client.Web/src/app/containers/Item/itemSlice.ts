import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
    name: 'itemPage',
    initialState: [],
    reducers: {
        addItem: (state, action) => {
        },
        updateItem(state, action) {}
    }
});

export const { addItem } = itemSlice.actions;
export default itemSlice.reducer;