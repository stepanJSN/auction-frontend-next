import { Typography } from "@mui/material";
import { Suspense } from "react";
import CardsData from "./CardsData";
import PageLoader from "@/components/PageLoader";

export default async function UserCardsPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        My Cards
      </Typography>
      <Suspense fallback={<PageLoader />}>
        <CardsData currentPage={currentPage} />
      </Suspense>
    </>
  );
}
