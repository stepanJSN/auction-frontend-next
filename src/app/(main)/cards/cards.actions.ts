"use server";

import { episodesService } from "@/services/episodesService";
import { locationsService } from "@/services/locationsService";
import { ICardFrom } from "./create/CreateCardForm";
import { cardsService } from "@/services/cardsService";

export async function getEpisodesByNameAction(episodeName: string) {
  return episodesService.getAll({ name: episodeName });
}

export async function getLocationsByNameAction(locationName: string) {
  return locationsService.getAll({ name: locationName });
}

export async function createCardAction(data: ICardFrom) {
  if (!data.image?.image) return;
  return cardsService.create({
    ...data,
    image: data.image?.image,
    locationId: data.location.id,
    episodesId: data.episodes.map((episode) => episode.id),
  });
}
