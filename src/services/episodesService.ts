import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import {
  ICreateEpisode,
  IEpisode,
  IGetEpisodesResponse,
} from "../interfaces/episodes.interfaces";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { AxiosError } from "axios";
import { MutationStatusEnum } from "@/enums/mutationStatus";

export const episodesService = {
  getAll: cache(
    async ({ page = 1, name }: { page?: number; name?: string }) => {
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        if (name) params.append("name", name);
        const episodes = await apiWithAuth.get<IGetEpisodesResponse>(
          "/episodes",
          {
            params,
          },
        );
        return { episodes: episodes.data, status: QueryStatusEnum.SUCCESS };
      } catch {
        return { status: QueryStatusEnum.ERROR };
      }
    },
  ),

  getOne: cache(async (id: number) => {
    try {
      const episode = await apiWithAuth.get<IEpisode>(`/episodes/${id}`);
      return { episode: episode.data, status: QueryStatusEnum.SUCCESS };
    } catch (error) {
      return {
        status: QueryStatusEnum.ERROR,
        errorCode: (error as AxiosError).status,
      };
    }
  }),

  create: async (data: ICreateEpisode) => {
    try {
      const episode = await apiWithAuth.post<IEpisode>("/episodes", data);
      return { episode: episode.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  update: async (id: number, data: Partial<Omit<IEpisode, "id">>) => {
    try {
      const episode = await apiWithAuth.patch<IEpisode>(
        `/episodes/${id}`,
        data,
      );
      return { episode: episode.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  delete: async (id: number) => {
    try {
      await apiWithAuth.delete(`/episodes/${id}`);
      return { status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  },
};
