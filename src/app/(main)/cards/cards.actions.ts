"use server";

import { episodesService } from "@/services/episodesService";
import { ICardFrom } from "@/interfaces/cards.interface";
import { cardsService } from "@/services/cardsService";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routesConfig";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { revalidatePath } from "next/cache";

export async function getEpisodesByNameAction(episodeName: string) {
  return episodesService.getAll({ name: episodeName });
}

export async function createCardAction(data: ICardFrom) {
  if (!data.image?.image) return;
  const response = await cardsService.create({
    ...data,
    image: data.image?.image,
    locationId: data.location.id,
    episodesId: data.episodes.map((episode) => episode.id),
  });
  if (response.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.CARDS);
  }
  return response;
}

export async function editCardAction(id: string, data: ICardFrom) {
  const response = await cardsService.update(id, {
    ...data,
    image: data.image?.image,
    locationId: data.location.id,
    episodesId: data.episodes.map((episode) => episode.id),
  });
  if (response.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.CARDS);
  }
  return response;
}

export async function deleteCardAction(id: string) {
  const { status } = await cardsService.delete(id);
  if (status === MutationStatusEnum.ERROR) {
    return status;
  }
  revalidatePath(ROUTES.CARDS);
  redirect(ROUTES.CARDS);
}
