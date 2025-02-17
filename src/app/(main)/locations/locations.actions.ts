"use server";

import { ICreateLocation } from "@/interfaces/locations.interfaces";
import { locationsService } from "@/services/locationsService";

export async function getMoreLocationsAction(page: number, name?: string) {
  return locationsService.getAll({
    page,
    name,
  });
}

export async function createLocationAction(payload: ICreateLocation) {
  return locationsService.create(payload);
}
