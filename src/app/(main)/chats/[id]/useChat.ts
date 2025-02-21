import { MutationStatusEnum } from "@/enums/mutationStatus";
import { useState, useCallback } from "react";
import {
  createMessageAction,
  deleteMessageAction,
  getMoreMessagesAction,
} from "../chats.actions";
import { IMessageWithCreateStatus } from "./messageWithCreateStatus.interface";
import { IMessage } from "@/interfaces/message.interfaces";

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
  const [messages, setMessages] = useState(
    initialMessages.map(addCreationStatusToMessage),
  );
  const [isScrollToBottomActive, setIsScrollToBottomActive] = useState(true);

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

  return {
    messages,
    isScrollToBottomActive,
    createMessage,
    loadMore,
    deleteMessage,
    resendMessage,
  };
}
