import { Typography } from "@mui/material";
import LocationsHeader from "./LocationsHeader";
import { locationsService } from "@/services/locationsService";
import PageError from "@/components/PageError";
import LocationsData from "./LocationsData";

export default async function LocationsPage(props: {
  searchParams?: Promise<{
    locationName?: string;
  }>;
}) {
  const searchLocationName = (await props.searchParams)?.locationName;
  const { locations } = await locationsService.getAll({
    name: searchLocationName,
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Locations
      </Typography>
      <LocationsHeader />
      {!locations && <PageError />}
      {locations && locations.data.length === 0 && (
        <Typography variant="h5" gutterBottom>
          There are no locations
        </Typography>
      )}
      {locations && locations.data.length !== 0 && (
        <LocationsData
          initialLocations={locations.data}
          searchLocationName={searchLocationName}
          hasMore={locations.info.page !== locations.info.totalPages}
        />
      )}
    </>
  );
}
