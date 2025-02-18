import { SelectChangeEvent } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { AuctionSearchParams } from "./auctionsSearchParams.enum";
import { ILocation } from "@/interfaces/locations.interfaces";
import { getLocationsByNameAction } from "@/actions";

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

  const handleShowOnlyWhereUserTakePartChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.checked) {
        const params = new URLSearchParams(searchParams);
        params.delete(AuctionSearchParams.PAGE);
        params.delete(AuctionSearchParams.IS_USER_TAKE_PART);
        replace(`${pathname}?${params.toString()}`);
        return;
      }
      changeSearchParams(AuctionSearchParams.IS_USER_TAKE_PART, "true");
    },
    [changeSearchParams, pathname, replace, searchParams],
  );

  const handleCardNameChange = useCallback(
    (value: string) => {
      changeSearchParams(AuctionSearchParams.CARD_NAME, value);
    },
    [changeSearchParams],
  );

  const resetFilters = useCallback(() => {
    replace(`${pathname}`);
  }, [pathname, replace]);

  const getLocationLabel = useCallback((location: ILocation | null) => {
    return location ? location.name : "";
  }, []);

  const searchLocation = useCallback((searchValue: string) => {
    return getLocationsByNameAction(searchValue);
  }, []);

  return {
    handleTypeChange,
    handleSortByChange,
    handleSortOrderChange,
    handleShowOnlyWhereUserTakePartChange,
    handleCardNameChange,
    resetFilters,
    getLocationLabel,
    searchLocation,
  };
}
