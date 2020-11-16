import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showFilterModal: false,
    showCourseModal: false,
    classIdToAddToCourse: "",
    savedVideos: []
};

const utilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        reqShowFilterModal: (state) => {
            state.showFilterModal = !state.showFilterModal;
            return state;
        },
        reqShowCourseModal: (state, action) => {
            state = {
                ...state,
                showCourseModal: !state.showCourseModal,
                classIdToAddToCourse: action.payload
            };
            return state;
        },
        updateSavedVideos: (state, action) => {
            state = {
                ...state,
                savedVideos: action.payload
            };
            return state;
        }
    }
});

const { actions, reducer } = utilsSlice;

export const { reqShowFilterModal, reqShowCourseModal, updateSavedVideos } = actions;
export default reducer;
