"use server";

import { ROUTES } from "@/config/routesConfig";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { paymentService } from "@/services/paymentService";
import { transactionsService } from "@/services/transactionsService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function withdrawAction(amount: number) {
  const response = await transactionsService.withdraw(amount);
  if (response.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.TRANSACTIONS);
  }
  return response;
}

export async function topUpAction(amount: number) {
  const response = await transactionsService.topUp(amount);
  if (response.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.TRANSACTIONS);
  }
  return response;
}

export async function createStripeAccountAction() {
  const response = await paymentService.createAccount();
  if (response.status === MutationStatusEnum.SUCCESS && response.data) {
    redirect(response.data);
  }
  return response;
}

export async function createPaymentIntentAction(numberOfPoints: number) {
  return paymentService.createPaymentIntent({ amount: numberOfPoints });
}
