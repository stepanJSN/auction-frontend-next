import { cache } from 'react';
import { apiWithAuth } from '../apiConfig';
import {
  ICardsStatisticsResponse,
  IGeneralStatistics,
  ISetsStatisticsResponse,
  IUsersStatistics,
} from '../interfaces/statistics.interfaces';

export const statisticsService = {
  findGeneralStatistics: cache(async () => {
    const response = await apiWithAuth.get<IGeneralStatistics>(
      '/statistics/general',
    );
    return response.data;
  }),

  findUserStatistics: cache(async (numberOfUsers?: number) => {
    const params = new URLSearchParams();
    if (numberOfUsers) params.append('numberOfUsers', numberOfUsers.toString());
    const response = await apiWithAuth.get<IUsersStatistics[]>(
      '/statistics/users',
      {
        params,
      },
    );
    return response.data;
  }),

  findCardsStatistics: cache(async (page?: number) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    const response = await apiWithAuth.get<ICardsStatisticsResponse>(
      '/statistics/cards',
      {
        params,
      },
    );
    return response.data;
  }),

  findSetsStatistics: cache(async (page?: number) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    const response = await apiWithAuth.get<ISetsStatisticsResponse>(
      '/statistics/sets',
      {
        params,
      },
    );
    return response.data;
  }),
};
