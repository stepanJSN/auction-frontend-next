import { all, fork } from "redux-saga/effects";
import { watchUserSaga } from "./features/user/userSaga";

export default function* rootSaga() {
  yield all([fork(watchUserSaga)]);
}
