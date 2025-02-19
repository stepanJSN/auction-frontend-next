"use server";

import { ROUTES } from "@/config/routesConfig";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import {
  ICreateAuction,
  IGetAuctionsPayload,
} from "@/interfaces/auctions.interfaces";
import { auctionService } from "@/services/auctionService";
import { locationsService } from "@/services/locationsService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function createAuctionAction(data: ICreateAuction) {
  const createdAuction = await auctionService.create(data);
  if (createdAuction.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.AUCTIONS);
  }
  return createdAuction;
}

export async function updateAuctionAction(id: string, data: ICreateAuction) {
  const updatedAuction = await auctionService.update(id, data);
  if (updatedAuction.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.AUCTIONS);
  }
  return updatedAuction;
}

export async function deleteAuctionAction(id: string) {
  const deletedAuction = await auctionService.delete(id);
  if (deletedAuction.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.AUCTIONS);
    redirect(ROUTES.AUCTIONS);
  }
  return deletedAuction;
}
