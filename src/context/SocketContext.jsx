import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import { useUserContext } from './userContext';
import { useSelector } from 'react-redux';

const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  NEW_MESSAGE: "new_message",
  CONVERSATION_UPDATE: "conversation_update",
  MARK_AS_SEEN: "mark_as_seen",
  MESSAGES_SEEN: "messages_seen",
  TYPING: "typing",
  STOP_TYPING: "stop_typing",
  CONNECT_ERROR: "connect_error",
};

const SocketContext = createContext({
  socket: null,
  isConnected: false,
  sendMessage: () => { },
  markMessagesAsSeen: () => { },
  startTyping: () => { },
  stopTyping: () => { },
  subscribeToMessages: () => { },
  unsubscribeFromMessages: () => { },
  subscribeToConversationUpdates: () => { },
  unsubscribeFromConversationUpdates: () => { },
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { currentUser } = useUserContext();

  const socketUrl = "http://10.10.20.22:5000";
  const { token } = useSelector((state) => state.auth);
  const [messageHandlers, setMessageHandlers] = useState(new Map());
  const [conversationUpdateHandlers, setConversationUpdateHandlers] = useState(new Map());
  const messageHandlersRef = useRef(new Map());
  const conversationUpdateHandlersRef = useRef(new Map());

  useEffect(() => {
    if (!currentUser?.user?._id || !token) {
      console.log("No current user or token found");
      return;
    }

    const socketInstance = io(socketUrl, {
      query: {
        token: token
      },
      transports: ["websocket", "polling"],
      withCredentials: true,
    });


    socketInstance.on(SOCKET_EVENTS.CONNECT, () => {
      console.log("Socket connected with ID:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    });

    socketInstance.on(SOCKET_EVENTS.CONNECT_ERROR, (err) => {
      console.error("Socket connection error:", err.message);
      setIsConnected(false);
    });


    const handleMessageEvent = (msg) => {
      console.log("New incoming message:", msg);

      messageHandlersRef.current.forEach((handler) => {
        try { handler(msg); } catch (e) { console.error(e); }
      });
    };

    
    if (currentUser?.user?._id) {
      socketInstance.on(`${SOCKET_EVENTS.NEW_MESSAGE}/${currentUser.user._id}`, handleMessageEvent);
    }


    const handleConversationUpdateEvent = (data) => {
      console.log("Conversation update:", data);
      conversationUpdateHandlersRef.current.forEach((handler) => {
        try { handler(data); } catch (e) { console.error(e); }
      });
    };

    // Listen to user-scoped conversation updates
    if (currentUser?.user?._id) {
      socketInstance.on(`${SOCKET_EVENTS.CONVERSATION_UPDATE}/${currentUser.user._id}`, handleConversationUpdateEvent);
    }


    socketInstance.on(SOCKET_EVENTS.MESSAGES_SEEN, (data) => {
      console.log("Messages seen update:", data);
    });

    socketInstance.on(SOCKET_EVENTS.TYPING, (data) => {
      console.log("Typing:", data);
    });

    socketInstance.on(SOCKET_EVENTS.STOP_TYPING, (data) => {
      console.log("Stop typing:", data);
    });

    socketInstance.on("error-message", (error) => {
      console.error("Socket error:", error);
    });

    setSocket(socketInstance);

    return () => {
      console.log("Cleaning up socket connection");
      socketInstance.disconnect();
    };
  }, [currentUser, token]);

  const sendMessage = useCallback((messageData) => {
    if (socket && isConnected) {
      console.log("Sending message:", messageData);
      socket.emit(SOCKET_EVENTS.NEW_MESSAGE, messageData);
      // Backend will emit conversation updates to sender and receiver by user-scoped channels.
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

  const subscribeToMessages = useCallback((handler) => {
    const handlerId = Date.now().toString();
    setMessageHandlers(prev => {
      const next = new Map(prev).set(handlerId, handler);
      messageHandlersRef.current = next;
      return next;
    });
    return handlerId;
  }, []);

  const unsubscribeFromMessages = useCallback((handlerId) => {
    setMessageHandlers(prev => {
      const next = new Map(prev);
      next.delete(handlerId);
      messageHandlersRef.current = next;
      return next;
    });
  }, []);

  const subscribeToConversationUpdates = useCallback((handler) => {
    console.log("Subscribing to conversation updates", handler);
    const handlerId = Date.now().toString();
    setConversationUpdateHandlers(prev => {
      const next = new Map(prev).set(handlerId, handler);
      conversationUpdateHandlersRef.current = next;
      return next;
    });
    return handlerId;
  }, []);

  const unsubscribeFromConversationUpdates = useCallback((handlerId) => {
    setConversationUpdateHandlers(prev => {
      const next = new Map(prev);
      next.delete(handlerId);
      conversationUpdateHandlersRef.current = next;
      return next;
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        sendMessage,
        markMessagesAsSeen,
        startTyping,
        stopTyping,
        subscribeToMessages,
        unsubscribeFromMessages,
        subscribeToConversationUpdates,
        unsubscribeFromConversationUpdates,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};