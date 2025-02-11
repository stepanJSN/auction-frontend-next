"use client";

import { io } from "socket.io-client";
import { SERVER_URL } from "./constants/envConstants";
import { getAccessToken } from "./actions";

const accessToken = getAccessToken();

export const socket = io(SERVER_URL, {
  auth: {
    token: `Bearer ${accessToken}`,
  },
  transports: ["websocket"],
});
