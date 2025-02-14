"use server";

import { ROUTES } from "@/config/routesConfig";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { ISetForm } from "@/interfaces/sets.interface";
import { cardsService } from "@/services/cardsService";
import { setsService } from "@/services/setsService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCardsAction(payload: { name: string; page: number }) {
  return cardsService.getAll(payload);
}

export async function createSetAction(data: ISetForm) {
  return setsService.create({
    name: data.name,
    bonus: +data.bonus,
    cardsId: data.cards.map((card) => card.id),
  });
}

export async function editSetAction(id: string, data: ISetForm) {
  return setsService.update(id, {
    ...data,
    cardsId: data.cards.map((card) => card.id),
  });
}

export async function deleteSetAction(id: string) {
  const { status } = await setsService.delete(id);
  if (status === MutationStatusEnum.ERROR) {
    return status;
  }
  revalidatePath(ROUTES.SETS);
  redirect(ROUTES.SETS);
}
