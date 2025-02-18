import { useState, useEffect } from "react";
import { IAuctionEvent } from "./auctionEvents.interfaces";
import { IAuctionSummary } from "@/interfaces/auctions.interfaces";

export default function useAuctions(initialAuctions: IAuctionSummary[]) {
  const [auctions, setAuctions] = useState(initialAuctions);

  useEffect(() => {
    setAuctions(initialAuctions);
  }, [initialAuctions]);

  const updateAuctionHighestBid = (eventPayload: IAuctionEvent["payload"]) => {
    setAuctions((prevActions) =>
      prevActions.map((auction) => {
        if (auction.id === eventPayload.id) {
          return {
            ...auction,
            highest_bid: eventPayload.bidAmount!,
            is_user_leader: false,
          };
        }
        return auction;
      }),
    );
  };

  const updateAuctionGeneralInfo = (eventPayload: IAuctionEvent["payload"]) => {
    setAuctions((prevActions) =>
      prevActions.map((auction) => {
        if (auction.id === eventPayload.id) {
          return {
            ...auction,
            starting_bid: eventPayload.startingBid ?? auction.starting_bid,
            min_bid_step: eventPayload.minBidStep ?? auction.min_bid_step,
            max_bid: eventPayload.maxBid ?? auction.max_bid,
            end_time: eventPayload.endTime ?? auction.end_time,
          };
        }
        return auction;
      }),
    );
  };

  const removeAuctionFromList = (id: string) => {
    setAuctions((prevActions) =>
      prevActions.filter((auction) => auction.id !== id),
    );
  };

  return {
    auctions,
    updateAuctionHighestBid,
    updateAuctionGeneralInfo,
    removeAuctionFromList,
  };
}
