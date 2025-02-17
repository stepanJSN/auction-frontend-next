"use client";
import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { ILocation } from "@/interfaces/locations.interfaces";
import { LinearProgress } from "@mui/material";
import PageError from "@/components/PageError";
import { LinearProgressPlaceholder } from "@/components/LinearProgressPlaceholder";
import LoadMoreBtn from "@/components/LoadMoreBtn";
import LocationsTable from "./LocationsTable";
import useLocations from "./useLocations";
import useClient from "@/hooks/useClient";
import PageLoader from "@/components/PageLoader";

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
  const { locations, locationsState, handleLoadMore } = useLocations({
    initialLocations,
    searchLocationName,
    hasMore,
  });
  const isClient = useClient();

  if (!isClient) {
    return <PageLoader />;
  }

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
