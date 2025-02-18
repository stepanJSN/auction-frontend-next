"use client";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { ILocation } from "@/interfaces/locations.interfaces";
import { LinearProgress } from "@mui/material";
import PageError from "@/components/PageError";
import { LinearProgressPlaceholder } from "@/components/LinearProgressPlaceholder";
import LoadMoreBtn from "@/components/LoadMoreBtn";
import LocationsTable from "./LocationsTable";
import useLoadMore from "@/hooks/useLoadMore";
import { getMoreLocationsAction } from "./locations.actions";

type LocationsDataProps = {
  initialLocations: ILocation[];
  searchLocationName?: string;
  hasMore: boolean;
};

export default function LocationsData({
  initialLocations,
  searchLocationName,
  hasMore,
}: LocationsDataProps) {
  const {
    data: locations,
    queryStatus: locationsState,
    handleLoadMore,
  } = useLoadMore({
    initialData: initialLocations,
    searchParams: searchLocationName,
    hasMore: hasMore,
    getMore: getMoreLocationsAction,
  });

  return (
    <>
      {locationsState === QueryStatusEnum.LOADING && <LinearProgress />}
      {locationsState === QueryStatusEnum.SUCCESS && (
        <LinearProgressPlaceholder />
      )}
      {locationsState === QueryStatusEnum.ERROR && <PageError />}
      {locations?.data && <LocationsTable locations={locations.data} />}
      <LoadMoreBtn
        isLoading={locationsState === QueryStatusEnum.LOADING}
        hasMore={locations.hasMore}
        handleLoadMore={handleLoadMore}
      />
    </>
  );
}
