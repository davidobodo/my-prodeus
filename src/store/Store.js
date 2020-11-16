import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./global/reducer/RootReducer";
import rootSaga from "./global/saga/RootSaga";

const isDevMode = process.env.NODE_ENV === "development";
const sagaMiddleware = createSagaMiddleware();

const allMiddlewares = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware: allMiddlewares,
    devTools: isDevMode //only show dev tools if we are in development mode
});

sagaMiddleware.run(rootSaga);

export default store;
