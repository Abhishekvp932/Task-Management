import { io } from "socket.io-client";

export const socket = io("https://task-management-k4gp.onrender.com", {
  transports: ["websocket"],
});
