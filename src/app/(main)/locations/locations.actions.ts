"use server";

import { locationsService } from "@/services/locationsService";

export async function getMoreLocationsAction(page: number, name?: string) {
  return await locationsService.getAll({
    page,
    name,
  });
}
