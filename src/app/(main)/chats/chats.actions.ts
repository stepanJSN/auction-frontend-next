"use server";

import { ROUTES } from "@/config/routesConfig";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { ICreateChat } from "@/interfaces/chats.interfaces";
import { chatsService } from "@/services/chatsService";
import { redirect } from "next/navigation";

export async function getMoreChats(page: number, chatName?: string) {
  return chatsService.findAll({
    page,
    name: chatName,
  });
}

export async function createChatAction(data: ICreateChat) {
  const response = await chatsService.create(data);
  if (response.status === MutationStatusEnum.SUCCESS && response.data) {
    redirect(ROUTES.CHAT(response.data.id));
  }
  return response;
}

export async function updateChatAction(id: string, data: ICreateChat) {
  return chatsService.update(id, data);
}
