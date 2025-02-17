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

export const userService = {
  create: async (data: ICreateUser) => {
    try {
      await api.post("/users", data);
    } catch (error) {
      return { errorCode: (error as AxiosError).status };
    }
  },

  update: async (id: string, data: IUpdateUser) => {
    const userData = await apiWithAuth.put(`/users/${id}`, data);
    return userData.data;
  },

  changeRole: async (id: string, role: Role) => {
    await apiWithAuth.patch(`/users/role`, { userId: id, role });
  },

  getOne: cache(async (id: string) => {
    const userData = await apiWithAuth.get<IUser>(`/users/${id}`);
    return userData.data;
  }),

  getCurrent: cache(async () => {
    const userData = await apiWithAuth.get<IUser>("/users/current");
    return userData.data;
  }),

  getAll: cache(async (payload: IGetUserPayload) => {
    try {
      const params = new URLSearchParams();
      if (payload.page) params.append("page", payload.page.toString());
      if (payload.sortType) params.append("sortType", payload.sortType);
      if (payload.sortOrder) params.append("sortOrder", payload.sortOrder);
      if (payload.isAdmin) params.append("isAdmin", payload.isAdmin.toString());
      const users = await apiWithAuth.get<IGetUsersResponse>("/users", {
        params,
      });
      return { data: users.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  }),

  delete: async (id: string) => {
    await apiWithAuth.delete(`/users/${id}`);
  },
};
