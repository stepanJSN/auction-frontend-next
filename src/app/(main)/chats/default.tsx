import ChatsPage from "./_components/ChatsPage";
import { CHAT_NAME_PARAM } from "./page";

export default async function Default(props: {
  searchParams?: Promise<{
    [CHAT_NAME_PARAM]?: string;
    page?: string;
  }>;
}) {
  return <ChatsPage searchParams={props.searchParams} />;
}
