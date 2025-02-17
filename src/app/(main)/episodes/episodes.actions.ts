"use server";

import { ROUTES } from "@/config/routesConfig";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { ICreateEpisode } from "@/interfaces/episodes.interfaces";
import { episodesService } from "@/services/episodesService";
import { revalidatePath } from "next/cache";

export async function getMoreEpisodesAction(page: number, name?: string) {
  return episodesService.getAll({
    page,
    name,
  });
}

export async function createEpisodeAction(payload: ICreateEpisode) {
  const createdEpisode = await episodesService.create(payload);
  if (createdEpisode.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.EPISODES);
  }
  return createdEpisode;
}

export async function editEpisodeAction(
  episodeId: number,
  payload: ICreateEpisode,
) {
  const updatedEpisode = await episodesService.update(episodeId, payload);
  if (updatedEpisode.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.EPISODES);
  }
  return updatedEpisode;
}

export async function deleteEpisodeAction(episodeId: number) {
  const deletedEpisode = await episodesService.delete(episodeId);
  if (deletedEpisode.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.EPISODES);
  }
  return deletedEpisode;
}
