import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "./features/user/userSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const combinedReducer = combineReducers({
  user: userReducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
