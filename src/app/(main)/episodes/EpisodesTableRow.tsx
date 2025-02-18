import { ROUTES } from "@/config/routesConfig";
import { IEpisode } from "@/interfaces/episodes.interfaces";
import { TableRow, TableCell, Stack, Button, SxProps } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useCallback } from "react";
import { deleteEpisodeAction } from "./episodes.actions";

type EpisodesTableRowProps = {
  episode: IEpisode;
};

const rowStyles: SxProps = {
  "&:last-child td, &:last-child th": { border: 0 },
};
const buttonsContainerStyles: SxProps = {
  justifyContent: "flex-end",
};
const showOnlyOnBigScreenStyles: SxProps = {
  display: {
    xs: "none",
    lg: "initial",
  },
};
const showOnlyOnSmallScreenStyles: SxProps = {
  display: {
    lg: "none",
  },
};

export default function EpisodesTableRow({ episode }: EpisodesTableRowProps) {
  const deleteEpisode = useCallback(
    () => deleteEpisodeAction(episode.id),
    [episode.id],
  );

  return (
    <>
      <TableRow sx={rowStyles}>
        <TableCell component="th" scope="row">
          {episode.name}
        </TableCell>
        <TableCell>{episode.code}</TableCell>
        <TableCell align="right">
          <Stack
            component={"span"}
            direction="row"
            spacing={1}
            sx={buttonsContainerStyles}
          >
            <Button
              variant="outlined"
              component={Link}
              href={ROUTES.EDIT_EPISODE(episode.id)}
              sx={showOnlyOnBigScreenStyles}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              component={Link}
              href={ROUTES.EDIT_EPISODE(episode.id)}
              sx={showOnlyOnSmallScreenStyles}
            >
              <EditIcon />
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={deleteEpisode}
              sx={showOnlyOnBigScreenStyles}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={deleteEpisode}
              sx={showOnlyOnSmallScreenStyles}
            >
              <DeleteIcon />
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}
