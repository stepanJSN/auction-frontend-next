import { call, delay, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getUser,
  getUserError,
  getUserSuccess,
  updateUserSuccess,
  updateUserError,
  resetUpdateUserStatus,
  deleteUser,
  deleteUserSuccess,
  deleteUserError,
  resetDeleteUserStatus,
  updateUser,
} from "./userSlice";
import { AxiosError } from "axios";
import { ErrorCodesEnum } from "@/enums/errorCodes.enum";
import { IUser, IUpdateUser } from "@/interfaces/user.interfaces";
import {
  deleteUserAction,
  getCurrentUserAction,
  getOneUserAction,
  updateUserAction,
} from "./user.actions";

const NOTIFICATION_TIMEOUT = 3000;

function* getUserSaga(action: PayloadAction<string | undefined>) {
  try {
    if (action.payload) {
      const userData: IUser = yield call(getOneUserAction, action.payload);
      yield put(getUserSuccess(userData));
    } else {
      const userData: IUser = yield call(getCurrentUserAction);
      yield put(getUserSuccess(userData));
    }
  } catch (error) {
    yield put(
      getUserError((error as AxiosError).status || ErrorCodesEnum.ServerError),
    );
  }
}

function* updateUserSaga(
  action: PayloadAction<{ id: string; data: IUpdateUser }>,
) {
  try {
    const userData: IUser = yield call(
      updateUserAction,
      action.payload.id,
      action.payload.data,
    );
    yield put(updateUserSuccess(userData));
  } catch (error) {
    yield put(
      updateUserError(
        (error as AxiosError).status || ErrorCodesEnum.ServerError,
      ),
    );
  } finally {
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetUpdateUserStatus());
  }
}

function* deleteUserSaga(action: PayloadAction<string>) {
  try {
    yield call(deleteUserAction, action.payload);
    yield put(deleteUserSuccess());
  } catch (error) {
    yield put(
      deleteUserError(
        (error as AxiosError).status || ErrorCodesEnum.ServerError,
      ),
    );
  } finally {
    yield delay(NOTIFICATION_TIMEOUT);
    yield put(resetDeleteUserStatus());
  }
}

export function* watchUserSaga() {
  yield takeLatest(getUser.type, getUserSaga);
  yield takeLatest(updateUser.type, updateUserSaga);
  yield takeLatest(deleteUser.type, deleteUserSaga);
}
