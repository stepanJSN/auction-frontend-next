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

export const auctionService = {
  create: async (data: ICreateAuction) => {
    await apiWithAuth.post("/auctions", data);
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
    const auction = await apiWithAuth.get<IAuction>(`/auctions/${id}`);
    return auction.data;
  }),

  update: async (id: string, data: IUpdateAuction) => {
    await apiWithAuth.patch(`/auctions/${id}`, data);
  },

  delete: async (id: string) => {
    await apiWithAuth.delete(`/auctions/${id}`);
  },
};
