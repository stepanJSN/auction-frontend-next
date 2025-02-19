"use server";

import { signOut } from "./auth";
import { revalidatePath } from "next/cache";
import { locationsService } from "./services/locationsService";

export async function logoutAction() {
  await signOut();
  revalidatePath("/");
}

export async function getLocationsByNameAction(locationName: string) {
  return locationsService.getAll({ name: locationName });
}
