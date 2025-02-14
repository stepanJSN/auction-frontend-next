import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import {
  ICreateSet,
  IGetSetsResponse,
  ISet,
} from "../interfaces/sets.interface";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { MutationStatusEnum } from "@/enums/mutationStatus";

export const setsService = {
  getAll: cache(async (page: number) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      const sets = await apiWithAuth.get<IGetSetsResponse>("/sets", {
        params,
      });
      return { sets: sets.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  }),

  getOne: cache(async (id: string) => {
    const set = await apiWithAuth.get<Omit<ISet, "is_user_has_set">>(
      `/sets/${id}`,
    );
    return set.data;
  }),

  create: async (data: ICreateSet) => {
    try {
      const set = await apiWithAuth.post<Omit<ISet, "is_user_has_set">>(
        "/sets",
        data,
      );
      return { data: set.data, status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  },

  update: async (id: string, data: Partial<ICreateSet>) => {
    const set = await apiWithAuth.patch<Omit<ISet, "is_user_has_set">>(
      `/sets/${id}`,
      data,
    );
    return set.data;
  },

  delete: async (id: string) => {
    await apiWithAuth.delete(`/sets/${id}`);
  },
};
