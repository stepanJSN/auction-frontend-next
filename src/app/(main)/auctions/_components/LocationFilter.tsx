import { getLocationsByNameAction } from "@/actions";
import Autocomplete from "@/components/Autocomplete";
import { ILocation } from "@/interfaces/locations.interfaces";
import { useCallback, useEffect, useState } from "react";
import { getLocationByIdAction } from "../auctions.actions";

type LocationFilter = {
  locationId: string | null;
  changeLocationId: (value: string | null) => void;
};

export default function LocationFilter({
  locationId,
  changeLocationId,
}: LocationFilter) {
  const [location, setLocation] = useState<ILocation | null>(null);

  const getLocationLabel = useCallback((location: ILocation | null) => {
    return location ? location.name : "";
  }, []);

  const searchLocation = useCallback((searchValue: string) => {
    return getLocationsByNameAction(searchValue);
  }, []);

  const handleLocationChange = useCallback(
    (item: ILocation | null) => {
      changeLocationId(item ? item.id.toString() : null);
    },
    [changeLocationId],
  );

  useEffect(() => {
    async function getLocation(locationId: number) {
      const { location } = await getLocationByIdAction(locationId);
      if (location) {
        setLocation(location);
      }
    }
    if (locationId) {
      getLocation(+locationId);
    }
  }, [locationId]);

  return (
    <Autocomplete
      label="Location"
      searchFunc={searchLocation}
      value={location}
      getLabel={getLocationLabel}
      onChange={handleLocationChange}
    />
  );
}
