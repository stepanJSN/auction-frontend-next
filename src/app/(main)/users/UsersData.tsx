"use client";
import useLoadMore from "@/hooks/useLoadMore";
import { IGetUserPayload, IUserSummary } from "@/interfaces/user.interfaces";
import { getUsersActions } from "./users.actions";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import PageError from "@/components/PageError";
import LoadMoreBtn from "@/components/LoadMoreBtn";
import { LinearProgress } from "@mui/material";
import { LinearProgressPlaceholder } from "@/components/LinearProgressPlaceholder";
import UsersTable from "./UsersTable";

type UsersDataProps = {
  initialUsers: IUserSummary[];
  filters: Omit<IGetUserPayload, "page">;
  hasMore: boolean;
};

export default function UsersData({
  initialUsers,
  filters,
  hasMore,
}: UsersDataProps) {
  const {
    data: users,
    queryStatus,
    handleLoadMore,
  } = useLoadMore({
    initialData: initialUsers,
    searchParams: filters,
    hasMore: hasMore,
    getMore: getUsersActions,
  });

  return (
    <>
      {queryStatus === QueryStatusEnum.ERROR && <PageError />}
      {queryStatus === QueryStatusEnum.LOADING && <LinearProgress />}
      {queryStatus === QueryStatusEnum.SUCCESS && <LinearProgressPlaceholder />}
      {users.data && (
        <>
          <UsersTable users={users.data} />
          <LoadMoreBtn
            isLoading={queryStatus === QueryStatusEnum.LOADING}
            hasMore={users.hasMore}
            handleLoadMore={handleLoadMore}
          />
        </>
      )}
    </>
  );
}
