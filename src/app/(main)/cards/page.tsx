import { Suspense } from "react";
import PageLoader from "@/components/PageLoader";
import CardsData from "./CardsData";
import FaqHeader from "@/components/FaqHeader";
import { ROUTES } from "@/config/routesConfig";

export default async function AllCardsPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <FaqHeader currentPage={ROUTES.CARDS} />
      <Suspense key={currentPage} fallback={<PageLoader />}>
        <CardsData currentPage={currentPage} />
      </Suspense>
    </>
  );
}
