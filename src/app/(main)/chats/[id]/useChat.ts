import { MutationStatusEnum } from "@/enums/mutationStatus";
import { useState, useCallback } from "react";
import {
  createMessageAction,
  deleteMessageAction,
  getMoreMessagesAction,
} from "../chats.actions";
import { IMessageWithCreateStatus } from "./messageWithCreateStatus.interface";
import {
  IDeleteMessageEventPayload,
  IMessage,
  IMessageEventPayload,
} from "@/interfaces/message.interfaces";
import useDeleteChatListener from "../hooks/useDeleteChatListener";
import useDeleteMessageListener from "../hooks/useDeleteMessageListener";
import useNewMessageListener from "../hooks/useNewMessageListener";
import { useSelector } from "react-redux";
import { selectUser } from "@/lib/features/user/userSlice";

const addCreationStatusToMessage = (
  message: IMessage,
): IMessageWithCreateStatus => {
  return {
    ...message,
    creationStatus: MutationStatusEnum.SUCCESS,
  };
};

type useChatParamsType = {
  chatId: string;
  initialCursor: string | null;
  initialMessages: IMessage[];
};

export default function useChat({
  chatId,
  initialCursor,
  initialMessages,
}: useChatParamsType) {
  const [cursor, setCursor] = useState<null | string>(initialCursor);
  const { id: userId } = useSelector(selectUser);
  const [messages, setMessages] = useState(
    initialMessages.map(addCreationStatusToMessage),
  );
  const [isScrollToBottomActive, setIsScrollToBottomActive] = useState(true);
  const [isChatDeletedDialogOpen, setIsChatDeletedDialogOpen] = useState(false);

  const updateMessage = useCallback(
    (params: {
      id: string;
      messages: IMessageWithCreateStatus[];
      newData: Partial<IMessageWithCreateStatus>;
    }) => {
      return params.messages.map((message) => {
        if (message.id === params.id) {
          return {
            ...message,
            ...params.newData,
          };
        }
        return message;
      });
    },
    [],
  );

  const createMessage = useCallback(
    async (message: string) => {
      setIsScrollToBottomActive(true);
      const tempId = new Date().getTime().toString();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: tempId,
          message,
          creationStatus: MutationStatusEnum.PENDING,
          sender: {
            is_this_user_message: true,
          },
        },
      ]);
      const response = await createMessageAction({
        chatId,
        message,
      });
      if (response.status === MutationStatusEnum.SUCCESS && response.data) {
        setMessages((prevMessages) =>
          updateMessage({
            id: tempId,
            messages: prevMessages,
            newData: {
              ...response.data,
              creationStatus: MutationStatusEnum.SUCCESS,
            },
          }),
        );
      }
      setMessages((prevMessages) =>
        updateMessage({
          id: tempId,
          messages: prevMessages,
          newData: {
            creationStatus: MutationStatusEnum.ERROR,
          },
        }),
      );
    },
    [chatId, updateMessage],
  );

  const deleteMessage = useCallback(
    async (messageId: string) => {
      const response = await deleteMessageAction({
        chatId,
        messageId,
      });
      if (response.status === MutationStatusEnum.SUCCESS) {
        setMessages((prevMessage) =>
          prevMessage.filter((message) => message.id !== messageId),
        );
      }
      return response;
    },
    [chatId],
  );

  const resendMessage = useCallback(
    async (messageId: string) => {
      const message = messages.find((message) => message.id === messageId);
      if (!message) return;
      setMessages((prevMessages) =>
        updateMessage({
          id: messageId,
          messages: prevMessages,
          newData: {
            creationStatus: MutationStatusEnum.PENDING,
          },
        }),
      );
      const response = await createMessageAction({
        chatId,
        message: message.message,
      });
      if (response.status === MutationStatusEnum.SUCCESS && response.data) {
        setMessages((prevMessages) =>
          updateMessage({
            id: messageId,
            messages: prevMessages,
            newData: {
              ...response.data,
              creationStatus: MutationStatusEnum.SUCCESS,
            },
          }),
        );
      }
      setMessages((prevMessages) =>
        updateMessage({
          id: messageId,
          messages: prevMessages,
          newData: {
            creationStatus: MutationStatusEnum.ERROR,
          },
        }),
      );
    },
    [chatId, messages, updateMessage],
  );

  const loadMore = useCallback(async () => {
    if (!cursor) return;
    setIsScrollToBottomActive(false);
    const response = await getMoreMessagesAction({
      id: chatId,
      cursor,
    });
    if (response.data) {
      setMessages((prevData) => [
        ...response.data.data.map(addCreationStatusToMessage),
        ...prevData,
      ]);
      setCursor(response.data.pagination.cursor);
    }
  }, [chatId, cursor]);

  const handleNewMessage = useCallback(
    (message: IMessageEventPayload) => {
      if (message.chat_id !== chatId || message.sender.id === userId) return;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...message,
          sender: {
            ...message.sender,
            is_this_user_message: false,
          },
          creationStatus: MutationStatusEnum.SUCCESS,
        },
      ]);
      setIsScrollToBottomActive(true);
    },
    [chatId, userId],
  );
  useNewMessageListener(handleNewMessage);

  const handleDeleteMessageEvent = useCallback(
    (data: IDeleteMessageEventPayload) => {
      setMessages((prevMessage) =>
        prevMessage.filter((message) => message.id !== data.id),
      );
    },
    [],
  );
  useDeleteMessageListener(handleDeleteMessageEvent);

  const handleDeleteChatEvent = useCallback((_id: string) => {
    setIsChatDeletedDialogOpen(true);
  }, []);
  useDeleteChatListener(handleDeleteChatEvent);

  return {
    messages,
    isScrollToBottomActive,
    isChatDeletedDialogOpen,
    createMessage,
    loadMore,
    deleteMessage,
    resendMessage,
  };
}
