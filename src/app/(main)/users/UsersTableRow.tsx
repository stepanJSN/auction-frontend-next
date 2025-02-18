import {
  TableRow,
  TableCell,
  Stack,
  Button,
  SxProps,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import { IUserSummary } from "@/interfaces/user.interfaces";
import { Role } from "@/enums/role.enum";
import DeleteUserButton from "./DeleteUserButton";

type UsersTableRowProps = {
  user: IUserSummary;
};

const rowStyles: SxProps = {
  "&:last-child td, &:last-child th": { border: 0 },
};
const buttonsContainerStyles: SxProps = {
  justifyContent: "flex-end",
};

export default function UsersTableRow({ user }: UsersTableRowProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <TableRow sx={rowStyles}>
      <TableCell component="th" scope="row">
        {`${user.name} ${user.surname}`}
      </TableCell>
      <TableCell align="right">{user.role}</TableCell>
      <TableCell align="right">{user.rating >= 0 && user.rating}</TableCell>
      <TableCell align="right">
        <Stack
          component={"span"}
          direction="row"
          spacing={1}
          sx={buttonsContainerStyles}
        >
          <Button variant="outlined" disabled={false}>
            {matches ? (
              `Make ${user.role === Role.USER ? "admin" : "user"}`
            ) : (
              <AddModeratorIcon />
            )}
          </Button>
          <DeleteUserButton
            isMobileVersion={matches}
            userId={user.id}
            userFullname={`${user.name} ${user.surname}`}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
