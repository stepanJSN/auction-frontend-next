import { MutationStatusEnum } from "@/enums/mutationStatus";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { Role } from "@/enums/role.enum";
import { IUser, IUpdateUser, IBalance } from "@/interfaces/user.interfaces";
import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string | null;
  role: Role | null;
  name: string | null;
  email: string | null;
  surname: string | null;
  rating: number | null;
  balance: {
    available: number;
    total: number;
  } | null;
  hasStripeAccount: boolean;
  created_at: string | null;
  status: QueryStatusEnum;
  updateStatus: MutationStatusEnum;
  deleteStatus: MutationStatusEnum;
  errorCode: number | null;
}

const initialState: UserState = {
  id: null,
  role: null,
  name: null,
  email: null,
  surname: null,
  rating: null,
  balance: null,
  created_at: null,
  errorCode: null,
  hasStripeAccount: false,
  status: QueryStatusEnum.IDLE,
  updateStatus: MutationStatusEnum.IDLE,
  deleteStatus: MutationStatusEnum.IDLE,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, _action: PayloadAction<string | undefined>) => {
      state.status = QueryStatusEnum.LOADING;
    },
    getUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.status = QueryStatusEnum.SUCCESS;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.surname = action.payload.surname;
      state.rating = action.payload.rating;
      state.balance = action.payload.balance;
      state.hasStripeAccount = action.payload.has_stripe_account;
      state.created_at = action.payload.created_at;
    },
    getUserError: (state) => {
      state.status = QueryStatusEnum.ERROR;
    },

    updateUser: (
      state,
      _action: PayloadAction<{ id: string; data: IUpdateUser }>,
    ) => {
      state.updateStatus = MutationStatusEnum.PENDING;
    },

    updateUserSuccess: (state, action: PayloadAction<Partial<IUser>>) => {
      state.updateStatus = MutationStatusEnum.SUCCESS;
      Object.assign(state, action.payload);
    },

    updateUserError: (state, action: PayloadAction<number>) => {
      state.updateStatus = MutationStatusEnum.ERROR;
      state.errorCode = action.payload;
    },

    resetUpdateUserStatus: (state) => {
      state.updateStatus = MutationStatusEnum.IDLE;
      state.errorCode = null;
    },

    deleteUser: (state, _action: PayloadAction<string>) => {
      state.deleteStatus = MutationStatusEnum.PENDING;
    },

    deleteUserSuccess: (state) => {
      Object.assign(state, initialState);
      state.deleteStatus = MutationStatusEnum.SUCCESS;
    },

    deleteUserError: (state, action: PayloadAction<number>) => {
      state.deleteStatus = MutationStatusEnum.ERROR;
      state.errorCode = action.payload;
    },

    resetDeleteUserStatus: (state) => {
      state.deleteStatus = MutationStatusEnum.IDLE;
      state.errorCode = null;
    },

    updateUserBalance: (state, action: PayloadAction<IBalance>) => {
      state.balance = action.payload;
    },
  },
});

export const {
  getUser,
  getUserSuccess,
  getUserError,
  updateUser,
  updateUserSuccess,
  updateUserError,
  resetUpdateUserStatus,
  deleteUser,
  deleteUserSuccess,
  deleteUserError,
  resetDeleteUserStatus,
  updateUserBalance,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
