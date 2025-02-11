"use server";

import { ROUTES } from "@/config/routesConfig";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logoutAction() {
  revalidatePath("/");
  redirect(ROUTES.SIGN_IN);
}
