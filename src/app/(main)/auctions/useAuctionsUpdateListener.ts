import { IAuctionSummary } from "@/interfaces/auctions.interfaces";
import { useEffect } from "react";
import { IAuctionEvent } from "./auctionEvents.interfaces";
import { AuctionEventEnum } from "./auctionEventEnum";
import { useSocket } from "@/provider/SocketProvider";

type useAuctionsUpdateListenerParams = {
  auctions: IAuctionSummary[];
  updateAuctionHighestBid: (eventPayload: IAuctionEvent["payload"]) => void;
  updateAuctionGeneralInfo: (eventPayload: IAuctionEvent["payload"]) => void;
  removeAuctionFromList: (auctionId: string) => void;
};

export default function useAuctionsUpdateListener({
  auctions,
  updateAuctionGeneralInfo,
  updateAuctionHighestBid,
  removeAuctionFromList,
}: useAuctionsUpdateListenerParams) {
  const socket = useSocket();
  useEffect(() => {
    const handleEvent = (event: IAuctionEvent) => {
      switch (event.type) {
        case AuctionEventEnum.NEW_BID:
          updateAuctionHighestBid(event.payload);
          break;
        case AuctionEventEnum.CHANGED:
          updateAuctionGeneralInfo(event.payload);
          break;
        case AuctionEventEnum.FINISHED:
          removeAuctionFromList(event.payload.id);
          break;
      }
    };
    if (auctions.length > 0 && socket) {
      auctions.forEach((auction) => {
        socket.on(`auction-${auction.id}`, handleEvent);
      });
    }
    return () => {
      if (auctions.length > 0 && socket) {
        auctions.forEach((auction) => {
          socket.off(`auction-${auction.id}`, handleEvent);
        });
      }
    };
  }, [
    auctions,
    removeAuctionFromList,
    socket,
    updateAuctionGeneralInfo,
    updateAuctionHighestBid,
  ]);
}
