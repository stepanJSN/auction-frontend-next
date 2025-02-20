import React from "react";
import { statisticsService } from "@/services/statisticsService";
import PageError from "@/components/PageError";
import StatisticsTable from "../StatisticsTable";
import Pagination from "@/components/Pagination";
import SetsStatisticsTableRow from "./SetsStatisticsTableRow";

const cardsTableTitles = ["Set name", "Number of users with this set"];

export default async function page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const { data: setsStatistics } =
    await statisticsService.findSetsStatistics(currentPage);

  if (!setsStatistics) {
    return <PageError />;
  }

  return (
    <>
      <StatisticsTable tableHeadTitles={cardsTableTitles}>
        {setsStatistics.data.map((set) => (
          <SetsStatisticsTableRow
            key={set.id}
            name={set.setName}
            numberOfUsers={set.numberOfUsers}
          />
        ))}
      </StatisticsTable>
      <Pagination totalPages={setsStatistics.info.totalPages} />
    </>
  );
}
