import React, { createContext, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { MESSAGES_KEY } from '../constants';
import { Message } from '../types';

const WS_URL = process.env.REACT_APP_WS_URL || '';

export const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ws = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      queryClient.setQueryData([MESSAGES_KEY], (oldMessages: Message[]) => [
        ...oldMessages,
        newMessage,
      ]);
    };

    return () => {
      ws.current?.close();
    };
  }, [queryClient]);

  return <WebSocketContext.Provider value={ws.current}>{children}</WebSocketContext.Provider>;
};
