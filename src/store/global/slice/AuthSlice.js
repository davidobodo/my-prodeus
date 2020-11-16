import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userToken: null,
    user: null,
    isLoading: false,
    isPasswordChangeLoading: false,
    isGoogleLoading: false,
    googleLink: "",
    signInErr: "",
    signUpErr: "",
    passwordChangeErr: "",
    passwordChangeSuc: "",
    profilePicLink: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        reqSignInStart: (state, action) => {
            state.isLoading = true;
            return state;
        },
        resSignInSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.userToken = action.payload.userToken;
            return state;
        },
        resSignInFail: (state, action) => {
            state.isLoading = false;
            state.signInErr = action.payload;
            return state;
        },
        reqSignUpStart: (state, action) => {
            state.isLoading = true;
            return state;
        },
        resSignUpSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.userToken = action.payload.userToken;
            return state;
        },
        resSignUpFail: (state, action) => {
            state.isLoading = false;
            state.signUpErr = action.payload;
            return state;
        },
        reqGoogleAuthStart: (state) => {
            state.isGoogleLoading = true;
            return state;
        },
        redirectToGoogleLink: (state, action) => {
            state.googleLink = action.payload.link;
            return state;
        },
        reqGetUserFromTokenStart: (state, action) => {
            return state;
        },
        reqLogout: (state) => {
            state.userToken = null;
            state.user = null;
            state.isLoading = false;
            state.isGoogleLoading = false;
            state.googleLink = "";
            state.signInErr = "";
            state.signUpErr = "";
            return state;
        },
        reqChangePasswordStart: (state, action) => {
            state.isPasswordChangeLoading = true;
            return state;
        },
        resChangePasswordSuccess: (state, action) => {
            state = {
                ...state,
                isPasswordChangeLoading: false,
                user: action.payload,
                passwordChangeSuc: "Password changed successfully"
            };
            return state;
        },
        resChangePasswordFail: (state, action) => {
            state = {
                ...state,
                isPasswordChangeLoading: false,
                passwordChangeErr: action.payload
            };
            return state;
        },
        clearChangePasswordStates: (state) => {
            state = {
                ...state,
                isPasswordChangeLoading: false,
                passwordChangeErr: "",
                passwordChangeSuc: ""
            };
            return state;
        },
        reqUpdateUser: (state, action) => {
            state = {
                ...state,
                user: action.payload
            };
            return state;
        },
        reqUpdateProfilePicLink: (state, action) => {
            state = {
                ...state,
                profilePicLink: action.payload
            };
            return state;
        }
    }
});

const { actions, reducer } = authSlice;

export const {
    reqSignInStart,
    resSignInFail,
    resSignInSuccess,
    reqSignUpStart,
    resSignUpFail,
    resSignUpSuccess,
    reqGoogleAuthStart,
    redirectToGoogleLink,
    reqGetUserFromTokenStart,
    reqLogout,
    reqChangePasswordStart,
    resChangePasswordSuccess,
    resChangePasswordFail,
    clearChangePasswordStates,
    reqUpdateUser,
    reqUpdateProfilePicLink
} = actions;

export default reducer;
