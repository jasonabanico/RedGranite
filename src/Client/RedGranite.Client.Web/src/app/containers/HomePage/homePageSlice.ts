import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: null,
}

const HomePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    }
});

export const { setItems } = HomePageSlice.actions;
export default HomePageSlice.reducer;