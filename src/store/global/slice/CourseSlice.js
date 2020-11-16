import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCourses: null,
    createdCourses: [],
    courseCurrentlyViewed: {
        details: null,
        classesPresent: []
    }
};

const mySlice = createSlice({
    name: "course",
    initialState: initialState,
    reducers: {
        populateAllCourses: (state, action) => {
            state.allCourses = action.payload;
            return state;
        },
        updateCreatedCourses: (state, action) => {
            state = {
                ...state,
                createdCourses: action.payload
            };
            return state;
        },
        updateCourseCurrentlyViewed: (state, action) => {
            state = {
                ...state,
                courseCurrentlyViewed: action.payload
            };
            return state;
        },
        updateCourseCurrentlyViewedDetails: (state, action) => {
            state = {
                ...state,
                courseCurrentlyViewed: {
                    ...state.courseCurrentlyViewed,
                    details: action.payload
                }
            };

            return state;
        },
        updateCourseCurrentlyViewedClasses: (state, action) => {
            state = {
                ...state,
                courseCurrentlyViewed: {
                    ...state.courseCurrentlyViewed,
                    classesPresent: action.payload
                }
            };

            return state;
        }
    }
});

export const {
    populateAllCourses,
    updateCreatedCourses,
    updateCourseCurrentlyViewed,
    updateCourseCurrentlyViewedDetails,
    updateCourseCurrentlyViewedClasses
} = mySlice.actions;
export default mySlice.reducer;
