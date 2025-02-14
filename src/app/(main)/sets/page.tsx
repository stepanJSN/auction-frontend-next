import { Suspense } from "react";
import PageLoader from "@/components/PageLoader";
import FaqHeader from "@/components/FaqHeader";
import { ROUTES } from "@/config/routesConfig";
import SetsList from "./SetsList";

export default async function AllCardsPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <FaqHeader currentPage={ROUTES.SETS} />
      <Suspense key={currentPage} fallback={<PageLoader />}>
        <SetsList currentPage={currentPage} />
      </Suspense>
    </>
  );
}
