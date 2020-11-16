import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allClasses: null,
    watchedClasses: [],
    createdClasses: []
};

const mySlice = createSlice({
    name: "class",
    initialState: initialState,
    reducers: {
        populateAllClasses: (state, action) => {
            state = {
                ...state,
                allClasses: action.payload
            };
            return state;
        },
        updateWatchedClasses: (state, action) => {
            state = {
                ...state,
                watchedClasses: action.payload
            };
            return state;
        },
        updateCreatedClasses: (state, action) => {
            state = {
                ...state,
                createdClasses: action.payload
            };
            return state;
        }
    }
});

export const { populateAllClasses, updateWatchedClasses, updateCreatedClasses } = mySlice.actions;
export default mySlice.reducer;
