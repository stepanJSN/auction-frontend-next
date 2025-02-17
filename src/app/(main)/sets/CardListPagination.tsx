import { Stack, Pagination as MuiPagination, SxProps } from "@mui/material";

type CardListPaginationProps = {
  currentPage: number;
  totalPages: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const paginationContainerStyles: SxProps = {
  mt: 2,
};

export default function CardListPagination({
  currentPage,
  totalPages,
  handleChange,
}: CardListPaginationProps) {
  return (
    <Stack alignItems="center" sx={paginationContainerStyles}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
}
