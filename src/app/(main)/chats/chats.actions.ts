"use server";

import { chatsService } from "@/services/chatsService";

export async function getMoreChats(page: number, chatName?: string) {
  return chatsService.findAll({
    page,
    name: chatName,
  });
}
