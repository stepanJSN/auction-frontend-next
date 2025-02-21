import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import {
  ICardsStatisticsResponse,
  IGeneralStatistics,
  ISetsStatisticsResponse,
  IUsersStatistics,
} from "../interfaces/statistics.interfaces";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";

export const statisticsService = {
  findGeneralStatistics: cache(async () => {
    try {
      const response = await apiWithAuth.get<IGeneralStatistics>(
        "/statistics/general",
      );
      return { data: response.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  }),

  findUserStatistics: cache(async (numberOfUsers?: number) => {
    try {
      const params = new URLSearchParams();
      if (numberOfUsers)
        params.append("numberOfUsers", numberOfUsers.toString());
      const response = await apiWithAuth.get<IUsersStatistics[]>(
        "/statistics/users",
        {
          params,
        },
      );
      return { data: response.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  }),

  findCardsStatistics: cache(async (page?: number) => {
    try {
      const params = new URLSearchParams();
      if (page) params.append("page", page.toString());
      const response = await apiWithAuth.get<ICardsStatisticsResponse>(
        "/statistics/cards",
        {
          params,
        },
      );
      return { data: response.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  }),

  findSetsStatistics: cache(async (page?: number) => {
    try {
      const params = new URLSearchParams();
      if (page) params.append("page", page.toString());
      const response = await apiWithAuth.get<ISetsStatisticsResponse>(
        "/statistics/sets",
        {
          params,
        },
      );
      return { data: response.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  }),
};
