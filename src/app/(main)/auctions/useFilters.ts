import { SelectChangeEvent } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { AuctionSearchParams } from "./auctionsSearchParams.enum";

export default function useFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const changeSearchParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(AuctionSearchParams.PAGE);
      params.set(name, value);
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const removeSearchParams = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(AuctionSearchParams.PAGE);
      params.delete(name);
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const handleTypeChange = useCallback(
    (event: SelectChangeEvent) => {
      changeSearchParams(AuctionSearchParams.TYPE, event.target.value);
    },
    [changeSearchParams],
  );

  const handleSortByChange = useCallback(
    (event: SelectChangeEvent) => {
      changeSearchParams(AuctionSearchParams.SORT_BY, event.target.value);
    },
    [changeSearchParams],
  );

  const handleSortOrderChange = useCallback(
    (event: SelectChangeEvent) => {
      changeSearchParams(AuctionSearchParams.SORT_ORDER, event.target.value);
    },
    [changeSearchParams],
  );

  const handleLocationChange = useCallback(
    (locationId: string | null) => {
      if (!locationId) {
        removeSearchParams(AuctionSearchParams.LOCATION);
        return;
      }
      changeSearchParams(AuctionSearchParams.LOCATION, locationId);
    },
    [changeSearchParams, removeSearchParams],
  );

  const handleShowOnlyWhereUserTakePartChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.checked) {
        removeSearchParams(AuctionSearchParams.IS_USER_TAKE_PART);
        return;
      }
      changeSearchParams(AuctionSearchParams.IS_USER_TAKE_PART, "true");
    },
    [changeSearchParams, removeSearchParams],
  );

  const handleCardNameChange = useCallback(
    (value: string) => {
      changeSearchParams(AuctionSearchParams.CARD_NAME, value);
    },
    [changeSearchParams],
  );

  const handlePriceChange = useCallback(
    (fromPrice: number, toPrice: number) => {
      const params = new URLSearchParams(searchParams);
      params.delete(AuctionSearchParams.PAGE);
      params.set(AuctionSearchParams.FROM_PRICE, fromPrice.toString());
      params.set(AuctionSearchParams.TO_PRICE, toPrice.toString());
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  const resetFilters = useCallback(() => {
    replace(`${pathname}`);
  }, [pathname, replace]);

  return {
    handleTypeChange,
    handleSortByChange,
    handleSortOrderChange,
    handleShowOnlyWhereUserTakePartChange,
    handleCardNameChange,
    handleLocationChange,
    handlePriceChange,
    resetFilters,
  };
}
