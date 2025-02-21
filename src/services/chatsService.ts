import { cache } from "react";
import { apiWithAuth } from "../apiConfig";
import {
  IChat,
  ICreateChat,
  ICreateChatResponse,
  IGetChatsResponse,
  IUpdateChat,
} from "../interfaces/chats.interfaces";
import {
  ICreateMessage,
  IDeleteMessage,
  IGetMessagesResponse,
  IMessage,
} from "../interfaces/message.interfaces";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { AxiosError } from "axios";

export const chatsService = {
  findAll: cache(async ({ page, name }: { page?: number; name?: string }) => {
    try {
      const params = new URLSearchParams();
      if (page) params.append("page", page.toString());
      if (name) params.append("name", name);
      const chats = await apiWithAuth.get<IGetChatsResponse>("/chats", {
        params,
      });
      return { data: chats.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  }),

  findOne: cache(async (id: string) => {
    try {
      const chat = await apiWithAuth.get<IChat>(`/chats/${id}`);
      return { data: chat.data, status: QueryStatusEnum.SUCCESS };
    } catch {
      return { status: QueryStatusEnum.ERROR };
    }
  }),

  findAllMessages: cache(
    async ({ id, cursor }: { cursor?: string; id: string }) => {
      try {
        const params = new URLSearchParams();
        if (cursor) params.append("cursor", cursor);
        const chat = await apiWithAuth.get<IGetMessagesResponse>(
          `/chats/${id}/messages`,
          {
            params,
          },
        );
        return { data: chat.data, status: QueryStatusEnum.SUCCESS };
      } catch {
        return { status: QueryStatusEnum.ERROR };
      }
    },
  ),

  create: async (data: ICreateChat) => {
    try {
      const chat = await apiWithAuth.post<ICreateChatResponse>("/chats", data);
      return { data: chat.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  update: async (id: string, data: IUpdateChat) => {
    try {
      const chat = await apiWithAuth.patch<IChat>(`/chats/${id}`, data);
      return { data: chat.data, status: MutationStatusEnum.SUCCESS };
    } catch (error) {
      return {
        errorCode: (error as AxiosError).status,
        status: MutationStatusEnum.ERROR,
      };
    }
  },

  delete: async (id: string) => {
    try {
      await apiWithAuth.delete(`/chats/${id}`);
      return { status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  },

  createMessage: async (data: ICreateMessage) => {
    try {
      const response = await apiWithAuth.post<IMessage>(
        `/chats/${data.chatId}/messages`,
        {
          message: data.message,
        },
      );
      return { data: response.data, status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  },

  deleteMessage: async ({ chatId, messageId }: IDeleteMessage) => {
    try {
      await apiWithAuth.delete(`/chats/${chatId}/messages/${messageId}`);
      return { status: MutationStatusEnum.SUCCESS };
    } catch {
      return { status: MutationStatusEnum.ERROR };
    }
  },
};
