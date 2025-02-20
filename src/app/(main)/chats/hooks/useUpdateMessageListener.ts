import { useEffect } from "react";
import { useSocket } from "@/provider/SocketProvider";
import { IMessageEventPayload } from "@/interfaces/message.interfaces";
import { ChatsEventEnum } from "../chatsEventsEnum";

export default function useUpdateMessageListener(
  onUpdateMessage: (id: IMessageEventPayload) => void,
) {
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.on(ChatsEventEnum.UPDATE_MESSAGE, onUpdateMessage);
    return () => {
      socket.off(ChatsEventEnum.UPDATE_MESSAGE, onUpdateMessage);
    };
  }, [onUpdateMessage, socket]);
}
