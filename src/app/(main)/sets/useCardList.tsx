import useQuery from "@/hooks/useQuery";
import { useCallback, useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { getCardsAction } from "./sets.action";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";

export default function useCardList() {
  const [page, setPage] = useState(1);
  const [debouncedCardName, setCardName] = useDebounceValue("", 500);
  const params = useMemo(
    () => ({
      page,
      name: debouncedCardName,
    }),
    [debouncedCardName, page],
  );

  const { data: sets, isLoading } = useQuery({
    requestFn: getCardsAction,
    params: params,
    autoFetch: true,
  });

  const handlePageChange = useCallback(
    (_e: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    [],
  );

  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setCardName(event.target.value),
    [setCardName],
  );

  return {
    data: sets?.data,
    isError: sets?.status === QueryStatusEnum.ERROR,
    isLoading,
    page,
    handlePageChange,
    handleFilterChange,
  };
}
