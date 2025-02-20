import useLoadMore from "@/hooks/useLoadMore";
import { IChatSummary } from "@/interfaces/chats.interfaces";
import { getMoreChats } from "../chats.actions";
import LoadMoreBtn from "@/components/LoadMoreBtn";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import ChatsTable from "./ChatsTable";
import { LinearProgress } from "@mui/material";
import { LinearProgressPlaceholder } from "@/components/LinearProgressPlaceholder";
import PageError from "@/components/PageError";

type ChatsListProps = {
  initialChats: IChatSummary[];
  searchChatName: string;
  hasMore: boolean;
};

export default function ChatsList({
  initialChats,
  searchChatName,
  hasMore,
}: ChatsListProps) {
  const {
    data: chats,
    queryStatus,
    handleLoadMore,
  } = useLoadMore({
    initialData: initialChats,
    searchParams: searchChatName,
    hasMore: hasMore,
    getMore: getMoreChats,
  });

  return (
    <>
      {queryStatus === QueryStatusEnum.LOADING && <LinearProgress />}
      {queryStatus === QueryStatusEnum.SUCCESS && <LinearProgressPlaceholder />}
      {queryStatus === QueryStatusEnum.ERROR && <PageError />}
      {queryStatus === QueryStatusEnum.SUCCESS && (
        <ChatsTable chats={chats.data} />
      )}
      <LoadMoreBtn
        isLoading={queryStatus === QueryStatusEnum.LOADING}
        hasMore={hasMore}
        handleLoadMore={handleLoadMore}
      />
    </>
  );
}
