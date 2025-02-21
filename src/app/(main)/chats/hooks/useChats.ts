import useLoadMore from "@/hooks/useLoadMore";
import {
  IChatSummary,
  ICreateChatEventPayload,
} from "@/interfaces/chats.interfaces";
import { getMoreChats } from "../chats.actions";
import {
  IMessageEventPayload,
  IDeleteMessageEventPayload,
} from "@/interfaces/message.interfaces";
import { useCallback } from "react";
import useCreateChatListener from "./useCreateChat";
import useDeleteChatListener from "./useDeleteChatListener";
import useDeleteMessageListener from "./useDeleteMessageListener";
import useNewMessageListener from "./useNewMessageListener";
import useUpdateMessageListener from "./useUpdateMessageListener";

type useChatsParams = {
  initialChats: IChatSummary[];
  searchName: string;
  hasMore: boolean;
};

export default function useChats({
  initialChats,
  searchName,
  hasMore,
}: useChatsParams) {
  const {
    data: chats,
    queryStatus,
    handleLoadMore,
    setData: setChats,
  } = useLoadMore({
    initialData: initialChats,
    searchParams: searchName,
    hasMore: hasMore,
    getMore: getMoreChats,
  });

  const handleDelete = useCallback(
    (id: string) => {
      setChats((chats) => ({
        ...chats,
        data: chats.data.filter((chat) => chat.id !== id),
      }));
    },
    [setChats],
  );
  useDeleteChatListener(handleDelete);

  const updateLastMessage = useCallback(
    (message: IMessageEventPayload, chat: IChatSummary) => {
      if (chat.id === message.chat_id) {
        return {
          ...chat,
          lastMessage: {
            id: message.id,
            created_at: message.created_at,
            message: message.message,
            sender: {
              name: message.sender.name,
              surname: message.sender.surname,
              is_this_user_message: false,
            },
          },
        };
      }
      return chat;
    },
    [],
  );

  const handleNewMessage = useCallback(
    (message: IMessageEventPayload) => {
      setChats((chats) => ({
        ...chats,
        data: chats.data.map((chat) => updateLastMessage(message, chat)),
      }));
    },
    [setChats, updateLastMessage],
  );
  useNewMessageListener(handleNewMessage);

  const handleEditMessage = useCallback(
    (message: IMessageEventPayload) => {
      setChats((chats) => ({
        ...chats,
        data: chats.data.map((chat) => updateLastMessage(message, chat)),
      }));
    },
    [setChats, updateLastMessage],
  );
  useUpdateMessageListener(handleEditMessage);

  const handleDeleteMessage = useCallback(
    (message: IDeleteMessageEventPayload) => {
      setChats((chats) => ({
        ...chats,
        data: chats.data.map((chat) => {
          if (chat.id === message.chat_id) {
            return {
              ...chat,
              lastMessage: null,
            };
          }
          return chat;
        }),
      }));
    },
    [setChats],
  );
  useDeleteMessageListener(handleDeleteMessage);

  const handleCreateChat = useCallback(
    (chatData: ICreateChatEventPayload) => {
      setChats((chats) => ({
        ...chats,
        data: [
          {
            id: chatData.id,
            name: chatData.name,
            lastMessage: null,
          },
          ...chats.data,
        ],
      }));
    },
    [setChats],
  );
  useCreateChatListener(handleCreateChat);

  return { chats, queryStatus, handleLoadMore };
}
