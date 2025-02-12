import {
  Grid2,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  Stack,
  Chip,
  SxProps,
} from "@mui/material";
import EpisodesList from "./EpisodesList";
import Image from "next/image";
import { cardsService } from "@/services/cardsService";
import CardSkeleton from "./CardSkeleton";

type CardDataProps = {
  id: string;
};

const containerStyles: SxProps = {
  minWidth: {
    xs: "none",
    sm: 700,
  },
};
const imgContainerStyles: SxProps = {
  alignSelf: "stretch",
  minHeight: 200,
  minWidth: 200,
  maxHeight: 450,
};
const cardTitleStyles: SxProps = {
  typography: "h4",
};

const episodesListStyles: SxProps = {
  maxHeight: 200,
  overflowY: "auto",
  mb: 1,
};

const imgContainerColumns = {
  xs: 12,
  sm: 5,
};
const textColumns = {
  xs: 12,
  sm: 7,
};

export default async function CardData({ id }: CardDataProps) {
  const { data } = await cardsService.getOne(id);

  if (!data) {
    return <CardSkeleton isError />;
  }

  return (
    <Grid2 container sx={containerStyles}>
      <Grid2 size={imgContainerColumns} sx={imgContainerStyles}>
        <Image src={data.image_url} alt={data.name} width={300} height={300} />
      </Grid2>
      <Grid2 size={textColumns}>
        <DialogTitle sx={cardTitleStyles}>{data.name}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Gender: {data.gender}</Typography>
          {data.type && (
            <Typography variant="subtitle1">Type: {data.type}</Typography>
          )}
          <Typography variant="subtitle1">
            Location: {data.location.name}
          </Typography>
          <Typography variant="subtitle1">Episodes with this card:</Typography>
          <List disablePadding sx={episodesListStyles}>
            {data.episodes.map((episode) => (
              <EpisodesList key={episode.id} name={episode.name} />
            ))}
          </List>
          <Stack direction="row" spacing={1}>
            {data.is_created_by_admin && (
              <Chip label="Created by admin" color="primary" />
            )}
            {data.is_active ? (
              <Chip label="active" color="success" />
            ) : (
              <Chip label="inactive" color="error" />
            )}
            {data.is_owned && (
              <Chip label="You have this card" color="success" />
            )}
          </Stack>
        </DialogContent>
      </Grid2>
    </Grid2>
  );
}
