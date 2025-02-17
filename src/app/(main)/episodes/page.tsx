import { Typography } from "@mui/material";
import { episodesService } from "@/services/episodesService";
import PageError from "@/components/PageError";
import EpisodesData from "./EpisodesData";
import EpisodesHeader from "./EpisodesHeader";

export default async function EpisodesPage(props: {
  searchParams?: Promise<{
    episodeName?: string;
  }>;
}) {
  const searchEpisodeName = (await props.searchParams)?.episodeName;
  const { episodes } = await episodesService.getAll({
    name: searchEpisodeName,
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Episode
      </Typography>
      <EpisodesHeader />
      {!episodes && <PageError />}
      {episodes && episodes.data.length === 0 && (
        <Typography variant="h5" gutterBottom>
          There are no episodes
        </Typography>
      )}
      {episodes && episodes.data.length !== 0 && (
        <EpisodesData
          initialEpisodes={episodes.data}
          searchEpisodeName={searchEpisodeName}
          hasMore={episodes.info.page !== episodes.info.totalPages}
        />
      )}
    </>
  );
}
