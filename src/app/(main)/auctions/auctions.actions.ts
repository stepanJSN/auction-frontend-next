"use server";

import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { IGetAuctionsPayload } from "@/interfaces/auctions.interfaces";
import { auctionService } from "@/services/auctionService";
import { locationsService } from "@/services/locationsService";

export async function getPriceRangeAction() {
  try {
    return await auctionService.findPriceRange();
  } catch (error) {
    console.log(error);
  }
}

export async function getAuctionsAction(payload?: IGetAuctionsPayload) {
  try {
    const auctions = await auctionService.findAll(payload || {});
    return { data: auctions, status: QueryStatusEnum.SUCCESS };
  } catch {
    return { status: QueryStatusEnum.ERROR };
  }
}

export async function getLocationByIdAction(locationId: number) {
  return locationsService.getOne(locationId);
}
