"use server";
import { ROUTES } from "@/config/routesConfig";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { IGetUserPayload } from "@/interfaces/user.interfaces";
import { userService } from "@/services/userService";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

export async function getUsersActions(
  currentPage: number,
  filters: Omit<IGetUserPayload, "page">,
) {
  try {
    const users = await userService.getAll({
      page: currentPage,
      ...filters,
    });
    return { data: users, status: QueryStatusEnum.SUCCESS };
  } catch (error) {
    return {
      errorCode: (error as AxiosError).status,
      status: QueryStatusEnum.ERROR,
    };
  }
}

export async function deleteUserAction(userId: string) {
  try {
    await userService.delete(userId);
    revalidatePath(ROUTES.USERS);
    return { status: MutationStatusEnum.SUCCESS };
  } catch (error) {
    return {
      errorCode: (error as AxiosError).status,
      status: MutationStatusEnum.ERROR,
    };
  }
}
