export const BASE_URL = "https://prodeus-api-staging.herokuapp.com";
export const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/videos";

//--------------------------------------------------------------------------
//Used to mock async request, just in case backend is not ready ...START...
//--------------------------------------------------------------------------
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";
// const mock = new MockAdapter(axios, { delayResponse: 3000 });
// mock.onGet("/signIn").reply(200, {
//     message: "It was a success"
// });
//
// try {
//     const res = yield call(axios.get, "/signIn");
//     yield put(resSignInSuccess(res.data.message));
// } catch (err) {
//     yield put(resSignInFail(err));
// }
//--------------------------------------------------------------------------
//Used to mock async request, just in case backend is not ready ...END...
//--------------------------------------------------------------------------
