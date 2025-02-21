import React from "react";
import CardsStatisticsTableRow from "./CardsStatisticsTableRow";
import { statisticsService } from "@/services/statisticsService";
import PageError from "@/components/PageError";
import StatisticsTable from "../StatisticsTable";
import Pagination from "@/components/Pagination";

const cardsTableTitles = ["Card name", "Number of instances", "Average price"];

export default async function page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const { data: cardsStatistics } =
    await statisticsService.findCardsStatistics(currentPage);

  if (!cardsStatistics) {
    return <PageError />;
  }

  return (
    <>
      <StatisticsTable tableHeadTitles={cardsTableTitles}>
        {cardsStatistics.data.map((card) => (
          <CardsStatisticsTableRow
            key={card.id}
            cardName={card.cardName}
            numberOfInstances={card.numberOfInstances}
            averagePrice={card.averagePrice}
          />
        ))}
      </StatisticsTable>
      <Pagination totalPages={cardsStatistics.info.totalPages} />
    </>
  );
}
