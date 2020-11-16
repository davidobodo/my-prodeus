import { all, takeEvery, put } from "redux-saga/effects";

import { getLocalStorage } from "@/utils/Utils";
import { BASE_URL } from "@/utils/Url";
import {
    reqChangePasswordStart,
    resChangePasswordSuccess,
    resChangePasswordFail
} from "@/store/global/slice/AuthSlice";

function* handleChangePassword(action) {
    const { userToken } = getLocalStorage("prodeus");
    const ENDPOINT = `${BASE_URL}/user/password`;

    try {
        const res = yield fetch(ENDPOINT, {
            body: JSON.stringify(action.payload),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            },
            method: "POST"
        });

        if (res.ok) {
            const data = yield res.json();

            yield put(resChangePasswordSuccess(data)); //Because the data returned is exactly identical to the data returned on successful sign in but only with the hashedPassword field updated
        } else {
            const err = yield res.json();
            throw err;
        }
    } catch (err) {
        console.log(err);
        yield put(resChangePasswordFail(err.error));
    }
}

function* watchHandleChangePassword() {
    yield takeEvery(reqChangePasswordStart.type, handleChangePassword);
}

export default function* () {
    yield all([watchHandleChangePassword()]);
}
