import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

import { getLocalStorage } from "./utils/Utils";
import { resSignInSuccess, reqLogout, reqUpdateProfilePicLink } from "./store/global/slice/AuthSlice";

import Root from "./Root";

const App = () => {
    const dispatch = useDispatch();

    const userData = getLocalStorage("prodeus");

    if (userData) {
        if (new Date().getTime() > userData.expirationTime) {
            dispatch(reqLogout());
        } else {
            dispatch(resSignInSuccess(userData));
            if (userData.profilePicLink) {
                dispatch(reqUpdateProfilePicLink(userData.profilePicLink));
            }
        }
    }

    return (
        <>
            <Root />
            <ToastContainer />
        </>
    );
};

export default App;
