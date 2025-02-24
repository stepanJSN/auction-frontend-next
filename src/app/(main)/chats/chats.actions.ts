"use server";

import { ROUTES } from "@/config/routesConfig";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { ICreateChat } from "@/interfaces/chats.interfaces";
import { ICreateMessage } from "@/interfaces/message.interfaces";
import { chatsService } from "@/services/chatsService";
import { revalidatePath } from "next/cache";
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

export async function deleteMessageAction({
  chatId,
  messageId,
}: {
  chatId: string;
  messageId: string;
}) {
  return chatsService.deleteMessage({ chatId, messageId });
}

export async function createMessageAction(payload: ICreateMessage) {
  return chatsService.createMessage(payload);
}

export async function getMoreMessagesAction(payload: {
  cursor: string;
  id: string;
}) {
  return chatsService.findAllMessages(payload);
}

export async function deleteChatAction(chatId: string) {
  const response = await chatsService.delete(chatId);
  if (response.status === MutationStatusEnum.SUCCESS) {
    revalidatePath(ROUTES.CHATS);
    redirect(ROUTES.CHATS);
  }
  return response;
}
