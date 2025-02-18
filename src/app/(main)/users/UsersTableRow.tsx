import { TableRow, TableCell, Stack, SxProps } from "@mui/material";
import { IUserSummary } from "@/interfaces/user.interfaces";
import DeleteUserButton from "./DeleteUserButton";
import UpdateUserRoleButton from "./UpdateUserRoleButton";

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
          <UpdateUserRoleButton
            userId={user.id}
            userFullname={`${user.name} ${user.surname}`}
            currentRole={user.role}
          />
          <DeleteUserButton
            userId={user.id}
            userFullname={`${user.name} ${user.surname}`}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
