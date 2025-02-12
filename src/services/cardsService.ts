import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import {
  ICard,
  ICreateCard,
  IGetCardsResponse,
} from "../interfaces/cards.interface";

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
    const card = await apiWithAuth.get<ICard>(`/cards/${id}`);
    return card.data;
  }),

  create: async (data: ICreateCard, image: Blob) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.type) formData.append("type", data.type);
    formData.append("gender", data.gender);
    formData.append("isActive", data.isActive.toString());
    formData.append("locationId", data.locationId.toString());
    formData.append("episodesId", JSON.stringify(data.episodesId));
    formData.append("image", image);
    const card = await apiWithAuth.post<ICard>("/cards", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return card.data;
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
