import { useEffect } from "react";
import { useSocket } from "@/provider/SocketProvider";
import { IDeleteMessageEventPayload } from "@/interfaces/message.interfaces";
import { ChatsEventEnum } from "../chatsEventsEnum";

export default function useDeleteMessageListener(
  onDeleteMessage: (data: IDeleteMessageEventPayload) => void,
) {
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.on(ChatsEventEnum.DELETE_MESSAGE, onDeleteMessage);
    return () => {
      socket.off(ChatsEventEnum.DELETE_MESSAGE, onDeleteMessage);
    };
  }, [onDeleteMessage, socket]);
}
