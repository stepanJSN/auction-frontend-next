import { getAccessToken } from "@/actions";
import { SERVER_URL } from "@/constants/envConstants";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

export default function useWebsocket() {
  useEffect(() => {
    let socket: Socket | null = null;
    async function initSocket() {
      try {
        const accessToken = await getAccessToken();

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
  }, []);
}
