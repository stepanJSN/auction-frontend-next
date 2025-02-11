"use server"

import { ROUTES } from "@/config/routesConfig";
import { ISingInRequest } from "@/interfaces/auth.interfaces";
import { authService } from "@/services/authService";
import { redirect } from "next/navigation";

export async function signinAction(formData: ISingInRequest) {
  const result = await authService.signIn(formData);
  if (result.errorCode) {
    return result;
  }
  redirect(ROUTES.USER_CARDS);
}