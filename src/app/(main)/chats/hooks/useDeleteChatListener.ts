import { useEffect } from "react";
import { ChatsEventEnum } from "../chatsEventsEnum";
import { useSocket } from "@/provider/SocketProvider";

export default function useDeleteChatListener(onDelete: (id: string) => void) {
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.on(ChatsEventEnum.DELETE, onDelete);
    return () => {
      socket.off(ChatsEventEnum.DELETE, onDelete);
    };
  }, [onDelete, socket]);
}
