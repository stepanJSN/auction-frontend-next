import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { useEffect, useState } from "react";
import { IEpisode } from "@/interfaces/episodes.interfaces";
import { getMoreEpisodesAction } from "./episodes.actions";

type useEpisodesProps = {
  initialEpisodes: IEpisode[];
  searchEpisodeName?: string;
  hasMore: boolean;
};

export default function useEpisodes({
  initialEpisodes,
  searchEpisodeName,
  hasMore,
}: useEpisodesProps) {
  const [episodes, setEpisodes] = useState({
    data: initialEpisodes,
    currentPage: 1,
    hasMore: hasMore,
  });
  const [episodesState, setEpisodesState] = useState(QueryStatusEnum.SUCCESS);

  const handleLoadMore = async () => {
    setEpisodesState(QueryStatusEnum.LOADING);
    const { episodes: newEpisodes } = await getMoreEpisodesAction(
      episodes.currentPage + 1,
      searchEpisodeName,
    );

    if (!newEpisodes) {
      setEpisodesState(QueryStatusEnum.ERROR);
      return;
    }

    setEpisodes({
      data: [...episodes.data, ...newEpisodes.data],
      currentPage: newEpisodes.info.page,
      hasMore: newEpisodes.info.page !== newEpisodes.info.totalPages,
    });
    setEpisodesState(QueryStatusEnum.SUCCESS);
  };

  useEffect(() => {
    setEpisodes({
      data: initialEpisodes,
      currentPage: 1,
      hasMore: hasMore,
    });
  }, [initialEpisodes, hasMore]);

  return { episodesState, handleLoadMore, episodes };
}
