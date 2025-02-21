import TableContainer from "@/components/TableContainer";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

type StatisticsTableProps = {
  children: React.ReactNode;
  tableHeadTitles: string[];
};

export default function StatisticsTable({
  children,
  tableHeadTitles,
}: StatisticsTableProps) {
  return (
    <TableContainer>
      <Table aria-label="cards statistics table">
        <TableHead>
          <TableRow>
            <TableCell>{tableHeadTitles[0]}</TableCell>
            {tableHeadTitles.slice(1).map((title) => (
              <TableCell key={title} align="center">
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
