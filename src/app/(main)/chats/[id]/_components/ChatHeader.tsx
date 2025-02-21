import { Divider, Grid2, Typography } from "@mui/material";

type ChatHeaderProps = {
  name: string;
  numberOfParticipants: number;
};

export default function ChatHeader({
  name,
  numberOfParticipants,
}: ChatHeaderProps) {
  return (
    <>
      <Grid2 container>
        <Grid2 size="grow">
          <Typography variant="h4">{name}</Typography>
          <Typography variant="subtitle1">
            Number of participants: {numberOfParticipants}
          </Typography>
        </Grid2>
      </Grid2>
      <Divider />
    </>
  );
}
