import { SERVER_URL } from "@/constants/envConstants";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";

export default function useSocket() {
  const accessToken = useSession().data?.user?.data.accessToken;
  const socket = io(SERVER_URL, {
    auth: {
      token: `Bearer ${accessToken}`,
    },
    transports: ["websocket"],
  });
  return socket;
}
