import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "@/constants/envConstants";

const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const accessToken = useSession().data?.user?.data.accessToken;
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (accessToken) {
      const socket = io(SERVER_URL, {
        auth: {
          token: `Bearer ${accessToken}`,
        },
        transports: ["websocket"],
      });
      setSocket(socket);
    }
  }, [accessToken]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
