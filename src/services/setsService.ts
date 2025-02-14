import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import {
  ICreateSet,
  IGetSetsResponse,
  ISet,
} from "../interfaces/sets.interface";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { AxiosError } from "axios";

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
    try {
      const set = await apiWithAuth.get<Omit<ISet, "is_user_has_set">>(
        `/sets/${id}`,
      );
      return { data: set.data, status: QueryStatusEnum.SUCCESS };
    } catch (error) {
      return {
        status: QueryStatusEnum.ERROR,
        errorCode: (error as AxiosError).status,
      };
    }
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
    try {
      const set = await apiWithAuth.patch<Omit<ISet, "is_user_has_set">>(
        `/sets/${id}`,
        data,
      );
      return { data: set.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  delete: async (id: string) => {
    try {
      await apiWithAuth.delete(`/sets/${id}`);
      return { status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  },
};
