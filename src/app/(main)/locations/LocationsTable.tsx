import TableContainer from "@/components/TableContainer";
import { ILocation } from "@/interfaces/locations.interfaces";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocationsTableRow from "./LocationsTableRow";
import PageLoader from "@/components/PageLoader";
import useClient from "@/hooks/useClient";

type LocationsTableProps = {
  locations: ILocation[];
};

export default function LocationsTable({ locations }: LocationsTableProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const isClient = useClient();

  if (!isClient) {
    return <PageLoader />;
  }

  return (
    <TableContainer>
      <Table aria-label="locations table" size={matches ? "medium" : "small"}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((location) => (
            <LocationsTableRow key={location.id} location={location} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
