import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slice/AuthSlice";
import alertReducer from "../slice/AlertSlice";
import utilsReducer from "../slice/UtilSlice";
import categoriesReducer from "../slice/CategoriesSlice";
import classReducer from "../slice/ClassSlice";
import courseReducer from "../slice/CourseSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    utils: utilsReducer,
    class: classReducer,
    categories: categoriesReducer,
    course: courseReducer
});

export default rootReducer;
