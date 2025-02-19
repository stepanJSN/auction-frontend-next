import { MutationStatusEnum } from "@/enums/mutationStatus";
import { apiWithAuth } from "../apiConfig";
import { ICreateBid } from "../interfaces/bids.interfaces";
import { AxiosError } from "axios";

export const bidsService = {
  create: async (data: ICreateBid) => {
    try {
      const bid = await apiWithAuth.post<number>("/bids", data);
      return { data: bid.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).response?.data?.code
          ? (error as AxiosError)?.response?.data?.code
          : (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },
};
