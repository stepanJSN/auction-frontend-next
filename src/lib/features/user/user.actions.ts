"use server";

import { IUpdateUser } from "@/interfaces/user.interfaces";
import { userService } from "@/services/userService";

export async function getOneUserAction(id: string) {
  return userService.getOne(id);
}

export async function getCurrentUserAction() {
  return userService.getCurrent();
}

export async function deleteUserAction(id: string) {
  return userService.delete(id);
}

export async function updateUserAction(id: string, payload: IUpdateUser) {
  return userService.update(id, payload);
}
