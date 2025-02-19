import { useEffect } from "react";
import { IAuctionEvent } from "../auctionEvents.interfaces";
import { AuctionEventEnum } from "../auctionEventEnum";
import { useSocket } from "@/provider/SocketProvider";

type useAuctionUpdateListenerParams = {
  auctionId: string;
  updateHighestBid: (bidAmount: number, isUserBid: boolean) => void;
  updateAuction: (eventPayload: IAuctionEvent["payload"]) => void;
  finishAuction: () => void;
};

export default function useAuctionUpdateListener({
  auctionId,
  updateHighestBid,
  updateAuction,
  finishAuction,
}: useAuctionUpdateListenerParams) {
  const socket = useSocket();

  useEffect(() => {
    const handleEvent = (event: IAuctionEvent) => {
      switch (event.type) {
        case AuctionEventEnum.NEW_BID:
          updateHighestBid(event.payload.bidAmount!, false);
          break;
        case AuctionEventEnum.CHANGED:
          updateAuction(event.payload);
          break;
        case AuctionEventEnum.FINISHED:
          finishAuction();
          break;
      }
    };
    if (socket) {
      socket.on(`auction-${auctionId}`, handleEvent);
    }
    return () => {
      if (socket) {
        socket.off(`auction-${auctionId}`, handleEvent);
      }
    };
  }, [auctionId, finishAuction, socket, updateAuction, updateHighestBid]);
}
