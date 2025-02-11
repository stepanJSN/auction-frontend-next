"use server";

import { ICreateUser } from "@/interfaces/user.interfaces";
import { userService } from "@/services/userService";

export async function signupAction(data: ICreateUser) {
  const result = await userService.create(data);
  return result;
}
