import { useState, useEffect, useCallback } from "react";
import { IAuctionEvent } from "../auctionEvents.interfaces";
import { IAuction } from "@/interfaces/auctions.interfaces";
import { useDispatch } from "react-redux";
import { getUser } from "@/lib/features/user/userSlice";

export default function useAuction(initialAuctionData: IAuction) {
  const [auction, setAuction] = useState(initialAuctionData);
  const dispatch = useDispatch();

  useEffect(() => {
    setAuction(initialAuctionData);
  }, [initialAuctionData]);

  const updateHighestBid = useCallback(
    (bidAmount: number, isUserBid: boolean) => {
      if (auction.highest_bid?.is_this_user_bid && !isUserBid) {
        dispatch(getUser());
      }
      setAuction((prevAuction) => ({
        ...prevAuction,
        highest_bid: {
          amount: bidAmount,
          is_this_user_bid: isUserBid,
        },
      }));
    },
    [auction.highest_bid?.is_this_user_bid, dispatch],
  );

  const updateAuction = useCallback(
    (eventPayload: IAuctionEvent["payload"]) => {
      setAuction((prevAuction) => ({
        ...prevAuction,
        starting_bid: eventPayload.startingBid ?? prevAuction.starting_bid,
        min_bid_step: eventPayload.minBidStep ?? prevAuction.min_bid_step,
        max_bid: eventPayload.maxBid ?? prevAuction.max_bid,
        min_length: eventPayload.minLength ?? prevAuction.min_length,
        end_time: eventPayload.endTime ?? prevAuction.end_time,
      }));
    },
    [],
  );

  const finishAuction = useCallback(() => {
    setAuction((prevAuction) => ({
      ...prevAuction,
      is_completed: true,
    }));
  }, []);

  return { auction, updateHighestBid, updateAuction, finishAuction };
}
