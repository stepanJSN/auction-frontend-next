import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import {
  IExchangeRate,
  IUpdateExchangeRate,
} from "../interfaces/system.interfaces";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { AxiosError } from "axios";
import { MutationStatusEnum } from "@/enums/mutationStatus";

export const systemService = {
  getExchangeRate: cache(async () => {
    try {
      const response = await apiWithAuth.get<IExchangeRate>(
        "/system/exchange-rate",
      );
      return { status: QueryStatusEnum.SUCCESS, data: response.data };
    } catch (error) {
      return {
        status: QueryStatusEnum.ERROR,
        errorCode: (error as AxiosError).status,
      };
    }
  }),

  updateExchangeRate: async (data: IUpdateExchangeRate) => {
    try {
      const response = await apiWithAuth.patch<IExchangeRate>(
        "/system/exchange-rate",
        data,
      );
      return {
        status: MutationStatusEnum.SUCCESS,
        data: response.data,
      };
    } catch (error) {
      return {
        status: MutationStatusEnum.ERROR,
        errorCode: (error as AxiosError).status,
      };
    }
  },
};
