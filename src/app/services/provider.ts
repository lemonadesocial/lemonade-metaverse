import { ethers } from 'ethers';

import { logger } from '../helpers/pino';

const WEBSOCKET_PING_INTERVAL = 60000;
const WEBSOCKET_PONG_TIMEOUT = 5000;

export interface Provider extends ethers.providers.BaseProvider {
  destroy?: () => Promise<void>;
}

export function createProvider(providerUrl: string): Provider {
  if (providerUrl.startsWith('ws')) {
    return new WebSocketProvider(providerUrl);
  }

  return new ethers.providers.JsonRpcProvider(providerUrl);
}

const WebSocketProviderClass = (): new () => ethers.providers.WebSocketProvider => (class {} as never);

class WebSocketProvider extends WebSocketProviderClass() {
  private provider?: ethers.providers.WebSocketProvider;

  private handler = {
    get(target: WebSocketProvider, prop: string, receiver: unknown) {
      const value = target.provider && Reflect.get(target.provider, prop, receiver);

      return value instanceof Function ? value.bind(target.provider) : value;
    },
  };

  constructor(private providerUrl: string) {
    super();
    this.create();

    return new Proxy(this, this.handler);
  }

  private create() {
    const events = this.provider?._events || [];

    const provider = new ethers.providers.WebSocketProvider(this.providerUrl);
    let pingInterval: NodeJS.Timeout | null = null;
    let pongTimeout: NodeJS.Timeout | null = null;

    provider._websocket.on('open', () => {
      pingInterval = setInterval(() => {
        provider._websocket.ping();

        pongTimeout = setTimeout(() => { provider._websocket.terminate(); }, WEBSOCKET_PONG_TIMEOUT);
      }, WEBSOCKET_PING_INTERVAL);

      events.forEach((event) => {
        provider._events.push(event);
        provider._startEvent(event);
      });
    });

    provider._websocket.on('error', (err: Error) => {
      logger.error({ err, url: this.providerUrl }, 'WebSocket error: %s', err.message);
    });

    provider._websocket.on('pong', () => {
      if (pongTimeout) clearTimeout(pongTimeout);
    });

    provider._websocket.on('close', (code: number) => {
      if (pingInterval) clearInterval(pingInterval);
      if (pongTimeout) clearTimeout(pongTimeout);

      if (code !== 1000) this.create();
    });

    this.provider = provider;
  }
}
