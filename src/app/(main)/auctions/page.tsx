import { Grid2, Typography } from "@mui/material";
import AuctionsFilters from "./AuctionsFilters";
import { IGetAuctionsPayload } from "@/interfaces/auctions.interfaces";
import AuctionData from "./AuctionData";

const filterGridBreakpoints = {
  xs: 0,
  md: 3,
};

const auctionsGridBreakpoints = {
  xs: 12,
  md: 9,
};

export default async function AuctionsPage(props: {
  searchParams?: Promise<IGetAuctionsPayload>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      <Typography variant="h4">Auctions</Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={filterGridBreakpoints}>
          <AuctionsFilters />
        </Grid2>
        <Grid2 spacing={2} size={auctionsGridBreakpoints}>
          <AuctionData searchParams={searchParams} />
        </Grid2>
      </Grid2>
    </>
  );
}
