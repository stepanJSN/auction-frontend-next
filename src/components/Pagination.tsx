"use client";
import { Stack, Pagination as MuiPagination, SxProps } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  totalPages: number;
};

const paginationContainerStyles: SxProps = {
  mt: 2,
};

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const changePage = (
    _event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack alignItems="center" sx={paginationContainerStyles}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={changePage}
      />
    </Stack>
  );
}
