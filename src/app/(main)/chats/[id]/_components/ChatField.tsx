"use client";
import { IMessage } from "@/interfaces/message.interfaces";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import { IMessageWithCreateStatus } from "../messageWithCreateStatus.interface";
import { MutationStatusEnum } from "@/enums/mutationStatus";
import { useCallback, useState } from "react";
import {
  createMessageAction,
  getMoreMessagesAction,
} from "../../chats.actions";

type ChatFieldProps = {
  initialMessages: IMessage[];
  initialCursor: string | null;
  chatId: string;
};

const addCreationStatusToMessage = (
  message: IMessage,
): IMessageWithCreateStatus => {
  return {
    ...message,
    creationStatus: MutationStatusEnum.SUCCESS,
  };
};

export default function ChatField({
  chatId,
  initialMessages,
  initialCursor,
}: ChatFieldProps) {
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

  const handleLoadMore = useCallback(async () => {
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

  return (
    <>
      <MessageList
        chatId={chatId}
        messages={messages}
        isScrollToBottomActive={isScrollToBottomActive}
        onLoadMoreMessages={handleLoadMore}
      />
      <MessageForm onSubmit={createMessage} />
    </>
  );
}
