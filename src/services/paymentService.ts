import { MutationStatusEnum } from "@/enums/mutationStatus";
import { apiWithAuth } from "../apiConfig";

export const paymentService = {
  createPaymentIntent: async (data: { amount: number }) => {
    try {
      const response = await apiWithAuth.post<{ clientSecret: string }>(
        "/stripe/create-payment-intent",
        data,
      );
      return { data: response.data, status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  },

  createAccount: async () => {
    try {
      const response = await apiWithAuth.post<string>("/stripe/create-account");
      return { data: response.data, status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  },
};
