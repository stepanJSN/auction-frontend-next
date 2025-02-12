"use server";

import { systemService } from "@/services/systemService";

export async function updateExchangeRate(newValue: number) {
  const result = await systemService.updateExchangeRate({
    exchangeRate: newValue,
  });
  return result;
}
