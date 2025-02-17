import TableContainer from "@/components/TableContainer";
import { IEpisode } from "@/interfaces/episodes.interfaces";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EpisodesTableRow from "./EpisodesTableRow";

type EpisodesTableProps = {
  episodes: IEpisode[];
};

export default function EpisodesTable({ episodes }: EpisodesTableProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <TableContainer>
      <Table aria-label="episodes table" size={matches ? "medium" : "small"}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {episodes.map((episode) => (
            <EpisodesTableRow key={episode.id} episode={episode} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
