import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import {
  ICreateLocation,
  IGetLocationsResponse,
  ILocation,
} from "../interfaces/locations.interfaces";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { AxiosError } from "axios";

export const locationsService = {
  getAll: cache(
    async ({ page = 1, name }: { page?: number; name?: string }) => {
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        if (name) params.append("name", name);
        const locations = await apiWithAuth.get<IGetLocationsResponse>(
          "/locations",
          {
            params,
          },
        );
        return { locations: locations.data, status: QueryStatusEnum.SUCCESS };
      } catch {
        return { status: QueryStatusEnum.ERROR };
      }
    },
  ),

  create: async (data: ICreateLocation) => {
    try {
      const location = await apiWithAuth.post<ILocation>("/locations", data);
      return { location: location.data, status: QueryStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: QueryStatusEnum.ERROR,
      };
    }
  },

  update: async (id: number, data: Partial<Omit<ILocation, "id">>) => {
    try {
      const location = await apiWithAuth.patch<ILocation>(
        `/locations/${id}`,
        data,
      );
      return { location: location.data, status: QueryStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: QueryStatusEnum.ERROR,
      };
    }
  },

  delete: async (id: number) => {
    try {
      await apiWithAuth.delete(`/locations/${id}`);
      return { status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  },
};
