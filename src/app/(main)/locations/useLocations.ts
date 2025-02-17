import { QueryStatusEnum } from "@/enums/queryStatus.enum";
import { useEffect, useState } from "react";
import { getMoreLocationsAction } from "./locations.actions";
import { ILocation } from "@/interfaces/locations.interfaces";

type useLocationsProps = {
  initialLocations: ILocation[];
  searchLocationName?: string;
  hasMore: boolean;
};

export default function useLocations({
  initialLocations,
  searchLocationName,
  hasMore,
}: useLocationsProps) {
  const [locations, setLocations] = useState({
    data: initialLocations,
    currentPage: 1,
    hasMore: hasMore,
  });
  const [locationsState, setLocationsState] = useState(QueryStatusEnum.SUCCESS);

  const handleLoadMore = async () => {
    setLocationsState(QueryStatusEnum.LOADING);
    const { locations: newLocations } = await getMoreLocationsAction(
      locations.currentPage + 1,
      searchLocationName,
    );

    if (!newLocations) {
      setLocationsState(QueryStatusEnum.ERROR);
      return;
    }

    setLocations({
      data: [...locations.data, ...newLocations.data],
      currentPage: newLocations.info.page,
      hasMore: newLocations.info.page !== newLocations.info.totalPages,
    });
    setLocationsState(QueryStatusEnum.SUCCESS);
  };

  useEffect(() => {
    setLocations({
      data: initialLocations,
      currentPage: 1,
      hasMore: hasMore,
    });
  }, [initialLocations, hasMore]);

  return { locationsState, handleLoadMore, locations };
}
