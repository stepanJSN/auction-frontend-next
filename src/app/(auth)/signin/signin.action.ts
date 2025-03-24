"use server";

import { signIn } from "@/auth";
import { ROUTES } from "@/config/routesConfig";
import { ErrorCodesEnum } from "@/enums/errorCodes.enum";
import { ISingInRequest } from "@/interfaces/auth.interfaces";
import { AuthError } from "next-auth";

export async function signinWithCredentialsAction(formData: ISingInRequest) {
  const payload = {
    ...formData,
    redirectTo: ROUTES.USER_CARDS,
  };
  try {
    await signIn("credentials", payload);
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        errorCode: ErrorCodesEnum.Unauthorized,
      };
    }

    throw error;
  }
}

export async function signinWithGoogleAction() {
  try {
    await signIn("google", { redirectTo: ROUTES.USER_CARDS });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error);
      return {
        errorCode: ErrorCodesEnum.Unauthorized,
      };
    }

    throw error;
  }
}
