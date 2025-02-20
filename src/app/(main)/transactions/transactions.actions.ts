"use server";

import { ROUTES } from "@/config/routesConfig";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { transactionsService } from "@/services/transactionsService";
import { revalidatePath } from "next/cache";

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
