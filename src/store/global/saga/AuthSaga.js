import { all, takeEvery, put } from "redux-saga/effects";
import jwtDecode from "jwt-decode";

import {
    reqSignInStart,
    resSignInFail,
    resSignInSuccess,
    reqSignUpStart,
    resSignUpSuccess,
    resSignUpFail,
    reqGoogleAuthStart,
    redirectToGoogleLink,
    reqGetUserFromTokenStart
} from "@/store/global/slice/AuthSlice";

import { BASE_URL } from "@/utils/Url";
import { setLocalStorage } from "@/utils/Utils";

function* handleSignInSaga(action) {
    const { email, password } = action.payload;
    const SIGNIN_ENDPOINT = `${BASE_URL}/auth/login`;
    const userData = {
        email: email.toLowerCase(),
        password
    };
    try {
        const res = yield fetch(SIGNIN_ENDPOINT, {
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });

        if (res.ok) {
            const data = yield res.json();

            //Store credentials in local storage
            const decodedToken = jwtDecode(data.userToken);
            const { exp } = decodedToken;
            const prodeusDetails = {
                expirationTime: exp * 1000,
                userToken: data.userToken,
                user: data.user
            };
            setLocalStorage("prodeus", prodeusDetails);
            yield put(resSignInSuccess(data));
        } else {
            const err = yield res.json();
            throw err;
        }
    } catch (err) {
        yield put(resSignInFail(err.error));
    }
}

function* handleSignUpSaga(action) {
    const { email, password, name } = action.payload;
    const SIGNUP_ENDPOINT = `${BASE_URL}/auth/register`;
    const _name = name.split(" ");
    const userData = {
        password,
        email: email.toLowerCase(),
        first_name: _name[0],
        last_name: _name[1]
    };
    try {
        const res = yield fetch(SIGNUP_ENDPOINT, {
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });
        if (res.ok) {
            const data = yield res.json();

            // Store credentials in local storage
            const decodedToken = jwtDecode(data.userToken);
            const { exp } = decodedToken;
            const prodeusDetails = {
                expirationTime: exp * 1000,
                userToken: data.userToken,
                user: data.user
            };
            setLocalStorage("prodeus", prodeusDetails);

            yield put(resSignUpSuccess(data));
        } else {
            const err = yield res.json();
            throw err;
        }
    } catch (err) {
        yield put(resSignUpFail(err.error));
    }
}

function* handleGoogleAuth() {
    const ENDPOINT = `${BASE_URL}/auth/getgooglelink`;

    try {
        const res = yield fetch(ENDPOINT, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        });
        if (res.ok) {
            const data = yield res.json();
            yield put(redirectToGoogleLink(data));
        }
    } catch (err) {}
}

function* handleGetUser(action) {
    const ENDPOINT = `${BASE_URL}/user/loggedin`;

    const token = action.payload;
    try {
        const res = yield fetch(ENDPOINT, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            method: "GET"
        });
        if (res.ok) {
            const data = yield res.json();

            //Store credentials in local storage
            const decodedToken = jwtDecode(token);
            const { exp } = decodedToken;
            const prodeusDetails = {
                expirationTime: exp * 1000,
                userToken: token,
                user: data
            };
            setLocalStorage("prodeus", prodeusDetails);

            const userDetails = {
                user: data,
                userToken: token
            };
            yield put(resSignInSuccess(userDetails));
        }
    } catch (err) {}
}

function* watchHandleSignInSaga() {
    yield takeEvery(reqSignInStart.type, handleSignInSaga);
}

function* watchHandleSignUpSaga() {
    yield takeEvery(reqSignUpStart.type, handleSignUpSaga);
}

function* watchHandleGoogleAuth() {
    yield takeEvery(reqGoogleAuthStart.type, handleGoogleAuth);
    yield takeEvery(reqGetUserFromTokenStart.type, handleGetUser);
}

export default function* () {
    yield all([watchHandleSignInSaga(), watchHandleSignUpSaga(), watchHandleGoogleAuth()]);
}
