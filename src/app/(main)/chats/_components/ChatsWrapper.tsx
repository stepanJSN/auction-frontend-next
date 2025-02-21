import PageError from "@/components/PageError";
import { chatsService } from "@/services/chatsService";
import { Typography } from "@mui/material";
import ChatsList from "./ChatsList";

type ChatsBodyProps = {
  page: number;
  chatName?: string;
};

export default async function ChatsWrapper({ page, chatName }: ChatsBodyProps) {
  const { data: chats } = await chatsService.findAll({ name: chatName, page });

  if (!chats) {
    return <PageError />;
  }

  if (chats.data.length === 0) {
    return <Typography>Chats not found</Typography>;
  }

  return (
    <ChatsList
      initialChats={chats.data}
      searchChatName={chatName}
      hasMore={chats.info.page !== chats.info.totalPages}
    />
  );
}
