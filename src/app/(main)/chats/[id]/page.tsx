import PageError from "@/components/PageError";
import { chatsService } from "@/services/chatsService";
import { Grid2 } from "@mui/material";
import React from "react";
import ChatHeader from "./_components/ChatHeader";
import ChatField from "./_components/ChatField";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const [{ data: messages }, { data: chatData }] = await Promise.all([
    chatsService.findAllMessages({
      id,
    }),
    chatsService.findOne(id),
  ]);

  if (!messages || !chatData) {
    return <PageError />;
  }

  return (
    <Grid2 container spacing={1}>
      <Grid2 size="grow">
        <>
          <ChatHeader
            name={chatData.name}
            numberOfParticipants={chatData.users.length}
          />
          <ChatField
            chatId={id}
            initialCursor={messages.pagination.cursor}
            initialMessages={messages.data}
          />
        </>
      </Grid2>
    </Grid2>
  );
}
