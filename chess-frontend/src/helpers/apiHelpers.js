import { io } from "socket.io-client";

export const url = "http://localhost:8000";
export const socket = io.connect(url);
