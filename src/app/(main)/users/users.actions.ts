"use server";
import { IGetUserPayload } from "@/interfaces/user.interfaces";
import { userService } from "@/services/userService";

export async function getMoreUsersActions(
  currentPage: number,
  filters: Omit<IGetUserPayload, "page">,
) {
  return userService.getAll({
    page: currentPage,
    ...filters,
  });
}
