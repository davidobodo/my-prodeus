import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCategories: null
};

const mySlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        populateAllCategories: (state, action) => {
            state.allCategories = action.payload;
            return state;
        }
    }
});

export const { populateAllCategories } = mySlice.actions;
export default mySlice.reducer;
