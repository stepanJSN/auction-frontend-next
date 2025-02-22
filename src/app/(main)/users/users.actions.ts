"use server";
import { ROUTES } from "@/config/routesConfig";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { Role } from "@/enums/role.enum";
import { IGetUserPayload } from "@/interfaces/user.interfaces";
import { userService } from "@/services/userService";
import { revalidatePath } from "next/cache";

export async function getUsersActions(
  currentPage: number,
  filters: Omit<IGetUserPayload, "page">,
) {
  return userService.getAll({
    page: currentPage,
    ...filters,
  });
}

export async function deleteUserAction(userId: string) {
  const response = await userService.delete(userId);
  if (response.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.USERS);
  }
}

export async function updateUserRoleAction(userId: string, role: Role) {
  const response = await userService.changeRole(userId, role);
  if (response.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.USERS);
  }
}
