"use server";

import { cardsService } from "@/services/cardsService";

export async function getCardsAction(payload: { name: string; page: number }) {
  return cardsService.getAll(payload);
}
