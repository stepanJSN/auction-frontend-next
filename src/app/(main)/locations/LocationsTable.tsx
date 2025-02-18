import TableContainer from "@/components/TableContainer";
import { ILocation } from "@/interfaces/locations.interfaces";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import LocationsTableRow from "./LocationsTableRow";

type LocationsTableProps = {
  locations: ILocation[];
};

export default function LocationsTable({ locations }: LocationsTableProps) {
  return (
    <TableContainer>
      <Table aria-label="locations table">
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
