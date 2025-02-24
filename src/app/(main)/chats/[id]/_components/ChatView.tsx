"use client";
import { IGetMessagesResponse } from "@/interfaces/message.interfaces";
import { Divider, Grid2 } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatField from "./ChatField";
import ChatSettings from "./ChatSettings";
import { IChat } from "@/interfaces/chats.interfaces";
import useSettingsVisibility from "../useSettingsVisibility";

const settingsGridBreakpoints = {
  xs: 0,
  md: 4,
};
const dividerStyles = {
  display: {
    xs: "none",
    md: "block",
  },
};

type ChatViewProps = {
  chatId: string;
  messages: IGetMessagesResponse;
  chatData: IChat;
};

export default function ChatView({
  chatId,
  messages,
  chatData,
}: ChatViewProps) {
  const { isSettingsOpen, openSettings, closeSettings } =
    useSettingsVisibility();

  return (
    <Grid2 container spacing={1}>
      <Grid2 size="grow">
        <ChatHeader
          name={chatData.name}
          numberOfParticipants={chatData.users.length}
          onSettingsButtonClick={openSettings}
        />
        <ChatField
          chatId={chatId}
          initialCursor={messages.pagination.cursor}
          initialMessages={messages.data}
        />
      </Grid2>
      <Divider sx={dividerStyles} orientation="vertical" flexItem />
      <Grid2 size={settingsGridBreakpoints}>
        <ChatSettings
          isOpen={isSettingsOpen}
          participants={chatData.users}
          chatId={chatId}
          onClose={closeSettings}
        />
      </Grid2>
    </Grid2>
  );
}
