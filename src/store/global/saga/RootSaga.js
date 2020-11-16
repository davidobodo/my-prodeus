import { all } from "redux-saga/effects";

import authSaga from "./AuthSaga";

import dailySnapshotSaga from "@/components/specific/dailySnapshot/DailySnapshotSaga";

export default function* rootSaga() {
    yield all([authSaga(), dailySnapshotSaga()]);
}
