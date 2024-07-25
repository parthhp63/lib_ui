import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3002";

const socket = io(SOCKET_URL, {
  reconnectionAttempts: 5,
  transports: ["websocket"],
});

export default socket;
