"use server";

import { cookies } from "next/headers";
import { ACCESS_TOKEN_KEY } from "./constants/globalConstants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "./config/routesConfig";
import { authService } from "./services/authService";

export async function setAccessToken(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN_KEY, accessToken);
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_KEY)?.value;
}

export async function clearStorage() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
}

export async function logoutAction() {
  await clearStorage();
  await authService.logout();
  revalidatePath("/");
  redirect(ROUTES.SIGN_IN);
}
