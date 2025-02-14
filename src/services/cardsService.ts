import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import {
  ICard,
  ICreateCard,
  IGetCardsResponse,
} from "../interfaces/cards.interface";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { AxiosError } from "axios";
import { MutationStatusEnum } from "@/enums/mutationStatus";

export const cardsService = {
  getAll: cache(
    async ({
      page,
      onlyUserCards = false,
      name,
    }: {
      page: number;
      onlyUserCards?: boolean;
      name?: string;
    }) => {
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        if (name) params.append("name", name);
        const url = onlyUserCards ? "/cards/myCards" : "/cards";
        const cards = await apiWithAuth.get<IGetCardsResponse>(url, {
          params,
        });
        return { data: cards.data, status: QueryStatusEnum.SUCCESS };
      } catch {
        return { success: QueryStatusEnum.ERROR };
      }
    },
  ),

  getOne: cache(async (id: string) => {
    try {
      const card = await apiWithAuth.get<ICard>(`/cards/${id}`);
      return { data: card.data, status: QueryStatusEnum.SUCCESS };
    } catch (error) {
      return {
        status: QueryStatusEnum.ERROR,
        errorCode: (error as AxiosError).status,
      };
    }
  }),

  create: async (data: ICreateCard) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.type) formData.append("type", data.type);
      formData.append("gender", data.gender);
      formData.append("isActive", data.isActive.toString());
      formData.append("locationId", data.locationId.toString());
      formData.append("episodesId", JSON.stringify(data.episodesId));
      formData.append("image", data.image);
      const card = await apiWithAuth.post<ICard>("/cards", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { data: card.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  update: async (id: string, data: Partial<ICreateCard>) => {
    try {
      const formData = new FormData();
      if (data.name) formData.append("name", data.name);
      if (data.type) formData.append("type", data.type);
      if (data.gender) formData.append("gender", data.gender);
      if (data.isActive) formData.append("isActive", data.isActive.toString());
      if (data.locationId)
        formData.append("locationId", data.locationId.toString());
      if (data.episodesId)
        formData.append("episodesId", JSON.stringify(data.episodesId));
      if (data.image) formData.append("image", data.image);
      const card = await apiWithAuth.patch<ICard>(`/cards/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { data: card.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  delete: async (id: string) => {
    try {
      await apiWithAuth.delete(`/cards/${id}`);
      return { status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  },
};
