"use client";
import { IMessage } from "@/interfaces/message.interfaces";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import useChat from "../useChat";
import ChatDeletedDialog from "./ChatDeletedDialog";

type ChatFieldProps = {
  initialMessages: IMessage[];
  initialCursor: string | null;
  chatId: string;
};

export default function ChatField({
  chatId,
  initialMessages,
  initialCursor,
}: ChatFieldProps) {
  const {
    messages,
    isScrollToBottomActive,
    isChatDeletedDialogOpen,
    createMessage,
    loadMore,
    deleteMessage,
    resendMessage,
  } = useChat({
    chatId,
    initialCursor,
    initialMessages,
  });

  return (
    <>
      <MessageList
        onDeleteMessage={deleteMessage}
        onResendMessage={resendMessage}
        messages={messages}
        isScrollToBottomActive={isScrollToBottomActive}
        onLoadMoreMessages={loadMore}
      />
      <MessageForm onSubmit={createMessage} />
      <ChatDeletedDialog open={isChatDeletedDialogOpen} />
    </>
  );
}
