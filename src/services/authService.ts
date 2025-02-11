import { AxiosError } from "axios";
import { api } from "../apiConfig";
import { ISingInRequest, ISingInResponse } from "../interfaces/auth.interfaces";
import { setAccessToken } from "@/actions";

export const authService = {
  signIn: async (data: ISingInRequest) => {
    try {
      const response = await api.post<ISingInResponse>("/auth/signin", data);
      if (response.data.accessToken)
        await setAccessToken(response.data.accessToken);
      return { data: response.data };
    } catch (error) {
      return { errorCode: (error as AxiosError).status };
    }
  },

  getNewTokens: async () => {
    return (await api.get<{ accessToken: string }>("/auth/access-token")).data;
  },

  clearStorage: () => {
    localStorage.clear();
  },

  logout: async () => {
    await api.get("/auth/logout");
  },
};
