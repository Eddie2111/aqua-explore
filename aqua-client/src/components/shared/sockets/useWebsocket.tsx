'use client';

import { useMemo } from 'react';

import { io } from 'socket.io-client';

const WS_BASE_URL = 'ws://localhost:5001';

export const useWebsocket = ({
  path,
  autoConnect = false,
}: {
  path: string;
  autoConnect?: boolean;
}) => {
  const socket = useMemo(() => {
    return io(WS_BASE_URL ?? '', {
      autoConnect,
      transports: ['websocket'],
      path,
    });
  }, [autoConnect, path]);

  return socket;
};
