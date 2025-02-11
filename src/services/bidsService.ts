import { apiWithAuth } from '../apiConfig';
import { ICreateBid } from '../interfaces/bids.interfaces';

export const bidsService = {
  create: async (data: ICreateBid) => {
    const bid = await apiWithAuth.post<number>('/bids', data);
    return bid.data;
  },
};
