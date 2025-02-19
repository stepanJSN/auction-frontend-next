import EpisodesList from "@/components/EpisodesList";
import { ICard } from "@/interfaces/cards.interface";
import { Grid2, List, SxProps, Typography } from "@mui/material";
import Image from "next/image";

type CardDataProps = {
  data: ICard;
};

const episodesListStyles: SxProps = {
  maxHeight: 150,
  overflowY: "auto",
};

const imgGridContainerColumns = {
  xs: 12,
  sm: 6,
  md: 3,
};

export default function CardData({ data }: CardDataProps) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={imgGridContainerColumns}>
        <Image src={data.image_url} alt={data.name} width={300} height={300} />
      </Grid2>
      <Grid2 size="grow">
        <Typography variant="h4" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="h6">Gender: {data.gender}</Typography>
        {data.type && <Typography variant="h6">Type: {data.type}</Typography>}
        <Typography variant="h6">Location: {data.location.name}</Typography>
        <Typography variant="h6">Episodes with this card:</Typography>
        <List disablePadding sx={episodesListStyles}>
          {data.episodes.map((episode) => (
            <EpisodesList key={episode.id} name={episode.name} />
          ))}
        </List>
      </Grid2>
    </Grid2>
  );
}
