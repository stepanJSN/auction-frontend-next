import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import {
  ICard,
  ICreateCard,
  IGetCardsResponse,
} from "../interfaces/cards.interface";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { AxiosError } from "axios";

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
        return { data: cards.data, success: true };
      } catch {
        return { success: false };
      }
    },
  ),

  getOne: cache(async (id: string) => {
    try {
      const card = await apiWithAuth.get<ICard>(`/cards/${id}`);
      return { data: card.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
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
      return { data: card.data, status: QueryStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: QueryStatusEnum.ERROR,
      };
    }
  },

  update: async (id: string, data: ICreateCard, image?: Blob) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.type) formData.append("type", data.type);
    formData.append("gender", data.gender);
    formData.append("isActive", data.isActive.toString());
    formData.append("locationId", data.locationId.toString());
    formData.append("episodesId", JSON.stringify(data.episodesId));
    if (image) formData.append("image", image);
    const card = await apiWithAuth.patch<ICard>(`/cards/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return card.data;
  },

  delete: async (id: string) => {
    await apiWithAuth.delete(`/cards/${id}`);
  },
};
