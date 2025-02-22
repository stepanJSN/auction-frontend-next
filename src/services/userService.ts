import { cache } from "react";
import { api, apiWithAuth } from "../apiConfig";
import { Role } from "../enums/role.enum";
import {
  ICreateUser,
  IGetUserPayload,
  IGetUsersResponse,
  IUpdateUser,
  IUser,
} from "../interfaces/user.interfaces";
import { AxiosError } from "axios";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { MutationStatusEnum } from "@/enums/mutationStatus";

export const userService = {
  create: async (data: ICreateUser) => {
    try {
      await api.post("/users", data);
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  update: async (id: string, data: IUpdateUser) => {
    try {
      const userData = await apiWithAuth.put(`/users/${id}`, data);
      return { data: userData.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  changeRole: async (id: string, role: Role) => {
    try {
      await apiWithAuth.patch(`/users/role`, { userId: id, role });
      return { status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  getOne: cache(async (id: string) => {
    try {
      const userData = await apiWithAuth.get<IUser>(`/users/${id}`);
      return { data: userData.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  }),

  getCurrent: cache(async () => {
    try {
      const userData = await apiWithAuth.get<IUser>("/users/current");
      return { data: userData.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  }),

  getAll: cache(async (payload: IGetUserPayload) => {
    try {
      const params = new URLSearchParams();
      if (payload.page) params.append("page", payload.page.toString());
      if (payload.sortType) params.append("sortType", payload.sortType);
      if (payload.sortOrder) params.append("sortOrder", payload.sortOrder);
      if (payload.isAdmin) params.append("isAdmin", payload.isAdmin.toString());
      if (payload.fullName) params.append("fullName", payload.fullName);
      const users = await apiWithAuth.get<IGetUsersResponse>("/users", {
        params,
      });
      return { data: users.data, status: QueryStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: QueryStatusEnum.ERROR,
      };
    }
  }),

  delete: async (id: string) => {
    try {
      await apiWithAuth.delete(`/users/${id}`);
      return { status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },
};
