import { ROUTES } from "@/config/routesConfig";
import { ILocation } from "@/interfaces/locations.interfaces";
import { TableRow, TableCell, Stack, Button, SxProps } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useCallback } from "react";
import { deleteLocationAction } from "./locations.actions";

type LocationsTableRowProps = {
  location: ILocation;
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

export default function LocationsTableRow({
  location,
}: LocationsTableRowProps) {
  const deleteLocation = useCallback(
    () => deleteLocationAction(location.id),
    [location.id],
  );

  return (
    <>
      <TableRow sx={rowStyles}>
        <TableCell component="th" scope="row">
          {location.name}
        </TableCell>
        <TableCell>{location.type}</TableCell>
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
              href={ROUTES.EDIT_LOCATION(location.id)}
              sx={showOnlyOnBigScreenStyles}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              component={Link}
              href={ROUTES.EDIT_LOCATION(location.id)}
              sx={showOnlyOnSmallScreenStyles}
            >
              <EditIcon />
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={deleteLocation}
              sx={showOnlyOnBigScreenStyles}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={deleteLocation}
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
