import { Button, Divider, Grid2, SxProps, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const buttonContainerStyles: SxProps = {
  display: {
    xs: "block",
    md: "none",
  },
};

type ChatHeaderProps = {
  name: string;
  numberOfParticipants: number;
  onSettingsButtonClick: () => void;
};

export default function ChatHeader({
  name,
  numberOfParticipants,
  onSettingsButtonClick,
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
        <Grid2 sx={buttonContainerStyles}>
          <Button
            aria-label="open chat settings"
            variant="contained"
            onClick={onSettingsButtonClick}
          >
            <SettingsIcon />
          </Button>
        </Grid2>
      </Grid2>
      <Divider />
    </>
  );
}
