import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";
let socket: Socket | null = null;

export function getSocket(): Socket | null {
  return socket;
}

export function connectSocket(userId: string): Socket {
  if (socket?.connected) {
    return socket;
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  socket = io(SOCKET_URL, {
    auth: {
      token: token ?? undefined,
    },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    socket?.emit("join", { userId });
  });

  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
