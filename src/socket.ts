import { io } from 'socket.io-client';
import { authService } from './services/authService';
import { SERVER_URL } from './constants/envConstants';

const accessToken = authService.getAccessToken();

export const socket = io(SERVER_URL, {
  auth: {
    token: `Bearer ${accessToken}`,
  },
  transports: ['websocket'],
});
