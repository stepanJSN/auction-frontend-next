import PageError from "@/components/PageError";
import { chatsService } from "@/services/chatsService";
import ChatView from "./_components/ChatView";

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

  return <ChatView chatId={id} messages={messages} chatData={chatData} />;
}
