import { ROUTES } from "@/config/routesConfig";
import { IEpisode } from "@/interfaces/episodes.interfaces";
import {
  TableRow,
  TableCell,
  Stack,
  Button,
  SxProps,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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

export default function EpisodesTableRow({ episode }: EpisodesTableRowProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
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
            >
              {matches ? "Edit" : <EditIcon />}
            </Button>
            <Button variant="outlined" color="error" onClick={deleteEpisode}>
              {matches ? "Delete" : <DeleteIcon />}
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}
