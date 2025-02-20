import { Table, TableBody } from "@mui/material";
import ChatsTableRow from "./ChatsTableRow";
import { IChatSummary } from "@/interfaces/chats.interfaces";
import TableContainer from "@/components/TableContainer";

type ChatsTableProps = {
  chats: IChatSummary[];
};

export default function ChatsTable({ chats }: ChatsTableProps) {
  return (
    <TableContainer>
      <Table aria-label="chats table">
        <TableBody>
          {chats.map((chat) => (
            <ChatsTableRow key={chat.id} chat={chat} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
