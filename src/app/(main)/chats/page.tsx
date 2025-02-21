import ChatsPage from "./_components/ChatsPage";

export const CHAT_NAME_PARAM = "name";

export default async function page(props: {
  searchParams?: Promise<{
    [CHAT_NAME_PARAM]?: string;
    page?: string;
  }>;
}) {
  return <ChatsPage searchParams={props.searchParams} />;
}
