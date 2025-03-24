import { AxiosError } from "axios";
import { api } from "../apiConfig";
import {
  IRefreshTokenResponse,
  ISingInRequest,
  ISingInResponse,
} from "../interfaces/auth.interfaces";

export const authService = {
  signInWithCredentials: async (data: ISingInRequest) => {
    try {
      const response = await api.post<ISingInResponse>(
        "/auth/signin/credentials",
        data,
      );
      return { data: response.data };
    } catch (error) {
      return { errorCode: (error as AxiosError).status };
    }
  },

  signInWithGoogle: async (accessToken?: string) => {
    try {
      const response = await api.post<ISingInResponse>("/auth/signin/google", {
        accessToken,
      });
      return { data: response.data };
    } catch (error) {
      return { errorCode: (error as AxiosError).status };
    }
  },

  getNewTokens: async (refreshToken: string) => {
    return (
      await api.post<IRefreshTokenResponse>("/auth/access-token", {
        refreshToken,
      })
    ).data;
  },

  clearStorage: () => {
    localStorage.clear();
  },

  logout: async () => {
    await api.get("/auth/logout");
  },
};
