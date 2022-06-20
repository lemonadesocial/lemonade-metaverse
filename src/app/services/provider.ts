import { ethers } from 'ethers';
import { URL } from 'url';
import SturdyWebSocket from 'sturdy-websocket';
import WebSocket from 'ws';

const WEBSOCKET_PING_INTERVAL = 30000;
const WEBSOCKET_PONG_TIMEOUT = 1000;

export interface Provider extends ethers.providers.BaseProvider {
  destroy?: () => Promise<void>;
}

export function createProvider(providerUrl: string): Provider {
  const url = new URL(providerUrl);

  switch (url.protocol) {
    case 'alchemy:':
      return new ethers.providers.AlchemyProvider(url.hostname, url.pathname.substring(1));
    case 'ws:':
    case 'wss:':
      return createWebSocketProvider(providerUrl);
    default:
      return new ethers.providers.JsonRpcProvider(providerUrl);
  }
}

function createWebSocketProvider(url: string) {
  const sturdyWebSocket = new SturdyWebSocket(url, { wsConstructor: WebSocket });
  const provider = new ethers.providers.WebSocketProvider(sturdyWebSocket as never);

  let pingInterval: NodeJS.Timer;
  let pongTimeout: NodeJS.Timeout;

  provider._websocket.on('open', () => {
    pingInterval = setInterval(() => {
      provider._websocket.ping();

      pongTimeout = setTimeout(() => { sturdyWebSocket.reconnect(); }, WEBSOCKET_PONG_TIMEOUT);
    }, WEBSOCKET_PING_INTERVAL);
  });

  provider._websocket.on('pong', () => {
    clearInterval(pongTimeout);
  });

  provider._websocket.on('close', () => {
    clearInterval(pingInterval);
    clearTimeout(pongTimeout);
  });

  return provider;
}
