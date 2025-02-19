import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import {
  AuctionTypeEnum,
  IAuction,
  ICreateAuction,
  IGetAuctionsPayload,
  IGetAuctionsResponse,
  IPriceRange,
  IUpdateAuction,
} from "../interfaces/auctions.interfaces";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { AxiosError } from "axios";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";

export const auctionService = {
  create: async (data: ICreateAuction) => {
    try {
      const createdAuction = await apiWithAuth.post("/auctions", data);
      return { data: createdAuction.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  findAll: cache(async (payload: IGetAuctionsPayload) => {
    const params = new URLSearchParams();
    if (payload.page) params.append("page", payload.page.toString());
    if (payload.locationId)
      params.append("locationId", payload.locationId.toString());
    if (payload.cardName) params.append("cardName", payload.cardName);
    if (payload.fromPrice)
      params.append("fromPrice", payload.fromPrice.toString());
    if (payload.toPrice) params.append("toPrice", payload.toPrice.toString());
    if (payload.isUserTakePart)
      params.append("isUserTakePart", payload.isUserTakePart.toString());
    if (payload.isUserLeader)
      params.append("isUserLeader", payload.isUserLeader.toString());
    if (payload.sortOrder) params.append("sortOrder", payload.sortOrder);
    if (payload.sortBy) params.append("sortBy", payload.sortBy);

    const url =
      payload.type === AuctionTypeEnum.WON_BY_USER
        ? "/auctions/wonByUser"
        : payload.type === AuctionTypeEnum.CREATED_BY_USER
          ? "/auctions/createdByUser"
          : "/auctions";

    const auctions = await apiWithAuth.get<IGetAuctionsResponse>(url, {
      params,
    });
    return auctions.data;
  }),

  findPriceRange: cache(async () => {
    const priceRange = await apiWithAuth.get<IPriceRange>(
      "/auctions/priceRange",
    );
    return priceRange.data;
  }),

  findOne: cache(async (id: string) => {
    try {
      const auction = await apiWithAuth.get<IAuction>(`/auctions/${id}`);
      return { data: auction.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  }),

  update: async (id: string, data: IUpdateAuction) => {
    try {
      const updatedAuction = await apiWithAuth.patch(`/auctions/${id}`, data);
      return { data: updatedAuction.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  delete: async (id: string) => {
    try {
      await apiWithAuth.delete(`/auctions/${id}`);
      return { status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  },
};
