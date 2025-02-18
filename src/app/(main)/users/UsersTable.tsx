import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import UsersTableRow from "./UsersTableRow";
import { IUserSummary } from "@/interfaces/user.interfaces";
import TableContainer from "@/components/TableContainer";

type UsersTableProps = {
  users: IUserSummary[];
};

export default function UsersTable({ users }: UsersTableProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <TableContainer>
      <Table aria-label="users table" size={matches ? "medium" : "small"}>
        <TableHead>
          <TableRow>
            <TableCell>Name and surname</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <UsersTableRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
