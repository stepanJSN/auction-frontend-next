"use client";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { IEpisode } from "@/interfaces/episodes.interfaces";
import { LinearProgress } from "@mui/material";
import PageError from "@/components/PageError";
import { LinearProgressPlaceholder } from "@/components/LinearProgressPlaceholder";
import LoadMoreBtn from "@/components/LoadMoreBtn";
import EpisodesTable from "./EpisodesTable";
import useEpisodes from "./useEpisodes";
import useClient from "@/hooks/useClient";
import PageLoader from "@/components/PageLoader";

type EpisodesDataProps = {
  initialEpisodes: IEpisode[];
  searchEpisodeName?: string;
  hasMore: boolean;
};

export default function EpisodesData({
  initialEpisodes,
  searchEpisodeName,
  hasMore,
}: EpisodesDataProps) {
  const { episodes, episodesState, handleLoadMore } = useEpisodes({
    initialEpisodes,
    searchEpisodeName,
    hasMore,
  });
  const isClient = useClient();

  if (!isClient) {
    return <PageLoader />;
  }

  return (
    <>
      {episodesState === QueryStatusEnum.LOADING && <LinearProgress />}
      {episodesState === QueryStatusEnum.SUCCESS && (
        <LinearProgressPlaceholder />
      )}
      {episodesState === QueryStatusEnum.ERROR && <PageError />}
      {episodes?.data && <EpisodesTable episodes={episodes.data} />}
      <LoadMoreBtn
        isLoading={episodesState === QueryStatusEnum.LOADING}
        hasMore={episodes.hasMore}
        handleLoadMore={handleLoadMore}
      />
    </>
  );
}
