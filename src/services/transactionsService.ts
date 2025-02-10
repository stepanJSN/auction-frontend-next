import { cache } from 'react';
import { apiWithAuth } from '../apiConfig';
import { IBalance } from '../interfaces/user.interfaces';

export const transactionsService = {
  topUp: async (amount: number) => {
    const balance = await apiWithAuth.post<IBalance>('/transactions/topUp', {
      amount,
    });
    return balance.data;
  },
  withdraw: async (amount: number) => {
    const balance = await apiWithAuth.post<IBalance>('/transactions/withdraw', {
      amount,
    });
    return balance.data;
  },
  getFeeAmount: cache(async () => {
    const fee = await apiWithAuth.get<{ totalFeeAmount: number }>(
      '/transactions/fee',
    );
    return fee.data;
  }),
};
