import { useEffect } from "react";
import { useSocket } from "@/provider/SocketProvider";
import { ChatsEventEnum } from "../chatsEventsEnum";
import { IMessageEventPayload } from "@/interfaces/message.interfaces";

export default function useNewMessageListener(
  onNewMessage: (message: IMessageEventPayload) => void,
) {
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.on(ChatsEventEnum.NEW_MESSAGE, onNewMessage);
    return () => {
      socket.off(ChatsEventEnum.NEW_MESSAGE, onNewMessage);
    };
  }, [onNewMessage, socket]);
}
