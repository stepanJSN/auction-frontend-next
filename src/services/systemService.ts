import { cache } from 'react';
import { apiWithAuth } from '../apiConfig';
import { IExchangeRate, IUpdateExchangeRate } from '../interfaces/system.interfaces';

export const systemService = {
  getExchangeRate: cache(async () => {
    const response = await apiWithAuth.get<IExchangeRate>(
      '/system/exchange-rate',
    );
    return response.data;
  }),

  updateExchangeRate: async (data: IUpdateExchangeRate) => {
    const response = await apiWithAuth.patch<IExchangeRate>(
      '/system/exchange-rate',
      data,
    );
    return response.data;
  },
};
