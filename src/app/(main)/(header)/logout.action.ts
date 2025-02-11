"use server";

import { clearStorage } from "@/actions";
import { ROUTES } from "@/config/routesConfig";
import { authService } from "@/services/authService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await clearStorage();
  await authService.logout();
  revalidatePath("/");
  redirect(ROUTES.SIGN_IN);
}
