"use server";

import { ISetForm } from "@/interfaces/sets.interface";
import { cardsService } from "@/services/cardsService";
import { setsService } from "@/services/setsService";

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
