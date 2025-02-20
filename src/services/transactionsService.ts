import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import { IBalance } from "../interfaces/user.interfaces";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { AxiosError } from "axios";

export const transactionsService = {
  topUp: async (amount: number) => {
    try {
      const balance = await apiWithAuth.post<IBalance>("/transactions/topUp", {
        amount,
      });
      return { data: balance.data, status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  },
  withdraw: async (amount: number) => {
    try {
      const balance = await apiWithAuth.post<IBalance>(
        "/transactions/withdraw",
        {
          amount,
        },
      );
      return { data: balance.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      console.log((error as AxiosError).response?.data.code);
      return {
        errorCode:
          (error as AxiosError).response?.data?.code ??
          (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },
  getFeeAmount: cache(async () => {
    try {
      const fee = await apiWithAuth.get<{ totalFeeAmount: number }>(
        "/transactions/fee",
      );
      return { data: fee.data, status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  }),
};
