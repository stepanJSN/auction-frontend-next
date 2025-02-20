import { useEffect } from "react";
import { useSocket } from "@/provider/SocketProvider";
import { ICreateChatEventPayload } from "@/interfaces/chats.interfaces";
import { ChatsEventEnum } from "../chatsEventsEnum";

export default function useCreateChatListener(
  onCreate: (data: ICreateChatEventPayload) => void,
) {
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.on(ChatsEventEnum.CREATE, onCreate);
    return () => {
      socket.off(ChatsEventEnum.CREATE, onCreate);
    };
  }, [onCreate, socket]);
}
