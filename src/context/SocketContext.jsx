import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useUserContext } from './userContext';

const SOCKET_EVENTS = {
  NEW_MESSAGE: "new_message",
  CONVERSATION_UPDATE: "conversation_update",
  MARK_AS_SEEN: "mark_as_seen",
  MESSAGES_SEEN: "messages_seen",
  TYPING: "typing",
  STOP_TYPING: "stop_typing",
};

const SocketContext = createContext({
  socket: null,
  isConnected: false,
  sendMessage: () => { },
  markMessagesAsSeen: () => { },
  startTyping: () => { },
  stopTyping: () => { },
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { currentUser } = useUserContext();
  const socketUrl = "http://10.10.20.22:5000/api/chat/";

  useEffect(() => {
    if (!currentUser?.user?._id) {
      console.log("No current user found");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    console.log("Attempting socket connection...");

    const socketInstance = io(socketUrl, {
      auth: {
        token: token
      },
      transports: ["websocket", "polling"],
    });

    // Connection events
    socketInstance.on("connect", () => {
      console.log("✅ Socket connected with ID:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("❗Socket connection error:", err.message);
      setIsConnected(false);
    });

    // Message events - fixed event names
    socketInstance.on(SOCKET_EVENTS.NEW_MESSAGE, (msg) => {
      console.log("📩 New incoming message:", msg);
    });

    socketInstance.on(SOCKET_EVENTS.MESSAGES_SEEN, (data) => {
      console.log("👀 Messages seen update:", data);
    });

    socketInstance.on(SOCKET_EVENTS.TYPING, (data) => {
      console.log("✍️ Typing:", data);
    });

    socketInstance.on(SOCKET_EVENTS.STOP_TYPING, (data) => {
      console.log("🛑 Stop typing:", data);
    });

    // Error events
    socketInstance.on("error-message", (error) => {
      console.error("Socket error:", error);
    });

    setSocket(socketInstance);

    return () => {
      console.log("Cleaning up socket connection");
      socketInstance.disconnect();
    };
  }, [currentUser]);

  const sendMessage = useCallback((messageData) => {
    if (socket && isConnected) {
      console.log("Sending message:", messageData);
      socket.emit(SOCKET_EVENTS.NEW_MESSAGE, messageData);
    } else {
      console.error("Socket not connected");
    }
  }, [socket, isConnected]);

  const markMessagesAsSeen = useCallback((data) => {
    if (socket && isConnected) {
      socket.emit(SOCKET_EVENTS.MARK_AS_SEEN, data);
    }
  }, [socket, isConnected]);

  const startTyping = useCallback((data) => {
    if (socket && isConnected) {
      socket.emit(SOCKET_EVENTS.TYPING, data);
    }
  }, [socket, isConnected]);

  const stopTyping = useCallback((data) => {
    if (socket && isConnected) {
      socket.emit(SOCKET_EVENTS.STOP_TYPING, data);
    }
  }, [socket, isConnected]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        sendMessage,
        markMessagesAsSeen,
        startTyping,
        stopTyping
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};