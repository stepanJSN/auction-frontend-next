import { List, Stack, SxProps } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useIntersectionObserver } from "usehooks-ts";
import { IMessageWithCreateStatus } from "../messageWithCreateStatus.interface";

type MessageListProps = {
  chatId: string;
  messages: IMessageWithCreateStatus[];
  isScrollToBottomActive: boolean;
  onLoadMoreMessages: () => void;
};

const messageFieldContainerStyles: SxProps = {
  height: "calc(100vh - 250px)",
  overflow: "auto",
};

const intersectionObserverOptions = {
  threshold: 0.5,
};

export default function MessageList({
  chatId,
  messages,
  onLoadMoreMessages,
  isScrollToBottomActive,
}: MessageListProps) {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const { isIntersecting, ref } = useIntersectionObserver(
    intersectionObserverOptions,
  );

  useEffect(() => {
    if (chatBoxRef.current && isScrollToBottomActive) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isScrollToBottomActive]);

  useEffect(() => {
    if (isIntersecting) {
      onLoadMoreMessages();
    }
  }, [isIntersecting, onLoadMoreMessages]);

  return (
    <Stack
      ref={chatBoxRef}
      direction="column-reverse"
      sx={messageFieldContainerStyles}
    >
      <List>
        {messages.map((message, index) => (
          <React.Fragment key={message.id || index}>
            {index === 0 && <div key={index} ref={ref}></div>}
            <Message key={message.id} message={message} chatId={chatId} />
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
