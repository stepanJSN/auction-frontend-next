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
      return { result: QueryStatusEnum.SUCCESS, data: response.data };
    } catch (error) {
      return {
        result: QueryStatusEnum.ERROR,
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
        result: MutationStatusEnum.SUCCESS,
        data: response.data,
      };
    } catch (error) {
      return {
        result: MutationStatusEnum.ERROR,
        errorCode: (error as AxiosError).status,
      };
    }
  },
};
