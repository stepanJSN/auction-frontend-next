"use client";
import { IAuction } from "@/interfaces/auctions.interfaces";
import { Chip, Divider, SxProps } from "@mui/material";
import NewBidForm from "./NewBidForm";
import AuctionData from "./AuctionData";
import { useEffect, useState } from "react";

type AuctionLiveDataProps = {
  auctionId: string;
  initialAuctionData: IAuction;
};

const chipStyles: SxProps = {
  maxWidth: "200px",
};

export default function AuctionLiveData({
  auctionId,
  initialAuctionData,
}: AuctionLiveDataProps) {
  const [auction, setAuction] = useState(initialAuctionData);

  useEffect(() => {
    setAuction(initialAuctionData);
  }, [initialAuctionData]);

  const isFormInactive =
    auction?.is_completed ||
    auction?.card.is_owned ||
    auction?.is_this_user_auction ||
    false;

  return (
    <>
      <AuctionData data={auction} />
      <Divider />
      {auction.is_this_user_auction && (
        <Chip label="This is your auction" color="info" sx={chipStyles} />
      )}
      <NewBidForm
        auctionId={auctionId}
        isFormInactive={isFormInactive}
        min={
          auction.highest_bid?.amount
            ? auction.highest_bid.amount + auction.min_bid_step
            : auction.starting_bid
        }
        max={auction.max_bid ?? undefined}
      />
    </>
  );
}
