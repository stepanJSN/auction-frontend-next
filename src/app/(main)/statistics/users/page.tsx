import PageError from "@/components/PageError";
import StatisticsTable from "../StatisticsTable";
import { statisticsService } from "@/services/statisticsService";
import UserStatisticsTableRow from "./UserStatisticsTableRow";
import UsersSelect from "./UsersSelect";

const cardsTableTitles = ["Users", "Number of cards"];

export default async function page(props: {
  searchParams?: Promise<{
    numberOfUsers?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const numberOfUsers = Number(searchParams?.numberOfUsers) || 10;
  const { data: usersStatistics } =
    await statisticsService.findUserStatistics(numberOfUsers);

  if (!usersStatistics) {
    return <PageError />;
  }

  return (
    <>
      <UsersSelect />
      <StatisticsTable tableHeadTitles={cardsTableTitles}>
        {usersStatistics.map((user) => (
          <UserStatisticsTableRow
            key={user.id}
            name={`${user.name} ${user.surname}`}
            numberOfInstances={user.numberOfCards}
          />
        ))}
      </StatisticsTable>
    </>
  );
}
