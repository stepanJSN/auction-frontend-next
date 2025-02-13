import { SERVER_URL } from "@/constants/envConstants";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

export default function useWebsocket() {
  const { data: session } = useSession();
  useEffect(() => {
    let socket: Socket | null = null;
    async function initSocket() {
      if (!session || !session.user) return;
      const accessToken = session.user.data.accessToken.token;
      try {
        const newSocket = io(SERVER_URL, {
          auth: { token: `Bearer ${accessToken}` },
          transports: ["websocket"],
        });
        newSocket.connect();
        socket = newSocket;
      } catch (error) {
        console.error("Socket connection error:", error);
      }
    }
    initSocket();
    return () => {
      if (socket) socket.disconnect();
    };
  }, [session]);
}
