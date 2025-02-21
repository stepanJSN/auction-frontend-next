import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { IPagination } from "@/interfaces/pagination.interface";
import { useEffect, useState } from "react";

type useLoadMoreProps<T, R> = {
  initialData: T[];
  searchParams: R;
  hasMore: boolean;
  getMore: (
    currentPage: number,
    searchParams: R,
  ) => Promise<{
    data?: {
      data: T[];
      info: IPagination;
    };
    status: QueryStatusEnum;
  }>;
};

export default function useLoadMore<T, R>({
  initialData,
  searchParams,
  getMore,
  hasMore,
}: useLoadMoreProps<T, R>) {
  const [data, setData] = useState({
    data: initialData,
    currentPage: 1,
    hasMore,
  });
  const [queryStatus, setQueryStatus] = useState(QueryStatusEnum.SUCCESS);

  const handleLoadMore = async () => {
    setQueryStatus(QueryStatusEnum.LOADING);
    const { data: newData } = await getMore(data.currentPage + 1, searchParams);

    if (!newData) {
      setQueryStatus(QueryStatusEnum.ERROR);
      return;
    }

    setData({
      data: [...data.data, ...newData.data],
      currentPage: newData.info.page,
      hasMore: newData.info.page !== newData.info.totalPages,
    });
    setQueryStatus(QueryStatusEnum.SUCCESS);
  };

  useEffect(() => {
    setData({
      data: initialData,
      currentPage: 1,
      hasMore: hasMore,
    });
  }, [initialData, hasMore]);

  return { queryStatus, handleLoadMore, data, setData };
}
