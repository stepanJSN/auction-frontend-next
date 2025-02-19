"use client";
import { Button, Grid2 } from "@mui/material";
import AuctionCard from "./AuctionCard";
import Link from "next/link";
import { ROUTES } from "@/config/routesConfig";
import { IAuctionSummary } from "@/interfaces/auctions.interfaces";
import useAuctions from "../useAuctions";
import useAuctionsUpdateListener from "../useAuctionsUpdateListener";

type AuctionsGridProps = {
  initialAuctions: IAuctionSummary[];
};

const auctionsGridBreakpoints = {
  xs: 12,
  sm: 6,
  lg: 4,
};

export default function AuctionsGrid({ initialAuctions }: AuctionsGridProps) {
  const {
    auctions,
    updateAuctionGeneralInfo,
    updateAuctionHighestBid,
    removeAuctionFromList,
  } = useAuctions(initialAuctions);
  useAuctionsUpdateListener({
    auctions: initialAuctions,
    updateAuctionGeneralInfo,
    updateAuctionHighestBid,
    removeAuctionFromList,
  });

  return (
    <Grid2 container spacing={2} size={12}>
      {auctions.length !== 0 &&
        auctions.map((auction) => (
          <Grid2 key={auction.id} size={auctionsGridBreakpoints}>
            <AuctionCard
              cardName={auction.name}
              imageUrl={auction.image_url}
              isUserLeader={auction.is_user_leader}
              isCompleted={auction.is_completed}
              isThisUserAuction={auction.is_this_user_auction}
              endTime={auction.end_time}
              highestBid={auction.highest_bid}
              maxBid={auction.max_bid}
              minBidStep={auction.min_bid_step}
              startingBid={auction.starting_bid}
            >
              {auction.is_this_user_auction ? (
                <Button
                  fullWidth
                  variant="contained"
                  component={Link}
                  href={ROUTES.EDIT_AUCTION(auction.id)}
                >
                  Edit auction
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  component={Link}
                  href={ROUTES.AUCTION_DETAILS(auction.id)}
                >
                  Make bid
                </Button>
              )}
            </AuctionCard>
          </Grid2>
        ))}
    </Grid2>
  );
}
