import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const useWebSocketPOI = (url, onMessage) => {
  const { lastMessage } = useWebSocket(url);

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage.data);
        onMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    }
  }, [,]);
};

export default useWebSocketPOI;
