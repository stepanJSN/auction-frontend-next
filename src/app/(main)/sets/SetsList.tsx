import { Stack, Typography } from "@mui/material";
import Pagination from "@/components/Pagination";
import PageError from "@/components/PageError";
import Set from "./Set";
import { notFound } from "next/navigation";
import { setsService } from "@/services/setsService";

type SetsListProps = {
  currentPage: number;
};

export default async function SetsList({ currentPage }: SetsListProps) {
  const { sets } = await setsService.getAll(currentPage);

  if (!sets) {
    return <PageError />;
  }
  if (sets.data.length === 0 && currentPage > 1) {
    return notFound();
  }
  if (sets.data.length === 0) {
    return (
      <Typography variant="h5" gutterBottom>
        There are no sets available
      </Typography>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        {sets.data.map((set) => (
          <Set key={set.id} set={set} />
        ))}
      </Stack>
      <Pagination totalPages={sets.info.totalPages} />
    </>
  );
}
