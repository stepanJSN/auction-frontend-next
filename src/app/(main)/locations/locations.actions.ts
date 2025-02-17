"use server";

import { ROUTES } from "@/config/routesConfig";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { ICreateLocation } from "@/interfaces/locations.interfaces";
import { locationsService } from "@/services/locationsService";
import { revalidatePath } from "next/cache";

export async function getMoreLocationsAction(page: number, name?: string) {
  return locationsService.getAll({
    page,
    name,
  });
}

export async function createLocationAction(payload: ICreateLocation) {
  return locationsService.create(payload);
}

export async function editLocationAction(
  locationId: number,
  payload: ICreateLocation,
) {
  const updatedLocation = await locationsService.update(locationId, payload);
  if (updatedLocation.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.LOCATIONS);
  }
  return updatedLocation;
}
