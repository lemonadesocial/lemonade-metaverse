import { Counter, Gauge } from 'prom-client';
import { ethers } from 'ethers';

import { logger } from '../helpers/pino';

const WEBSOCKET_BACKOFF_BASE = 100;
const WEBSOCKET_BACKOFF_CAP = 30000;
const WEBSOCKET_PING_INTERVAL = 10000;
const WEBSOCKET_PONG_TIMEOUT = 5000;

const webSocketClosesTotal = new Counter({
  name: 'provider_websocket_closes_total',
  help: 'Total number of provider websocket closes',
  labelNames: ['network', 'code'],
});
const webSocketErrorsTotal = new Counter({
  name: 'provider_websocket_errors_total',
  help: 'Total number of provider websocket errors',
  labelNames: ['network'],
});
const webSocketStatus = new Gauge({
  name: 'provider_websocket_status',
  help: 'Status of the provider websocket',
  labelNames: ['network'],
});
const webSocketTimeoutsTotal = new Counter({
  name: 'provider_websocket_timeouts_total',
  help: 'Total number of provider websocket timeouts',
  labelNames: ['network'],
});

export interface Provider extends ethers.providers.BaseProvider {
  destroy?: () => Promise<void>;
}

export function createProvider(providerUrl: string, name: string): Provider {
  if (providerUrl.startsWith('ws')) {
    return new WebSocketProvider(providerUrl, name);
  }

  return new ethers.providers.StaticJsonRpcProvider(providerUrl);
}

const WebSocketProviderClass = (): new () => ethers.providers.WebSocketProvider => (class {} as never);

class WebSocketProvider extends WebSocketProviderClass() {
  private attempts = 0;
  private events: ethers.providers.WebSocketProvider['_events'] = [];
  private requests: ethers.providers.WebSocketProvider['_requests'] = {};
  private provider?: ethers.providers.WebSocketProvider;

  private handler = {
    get(target: WebSocketProvider, prop: string, receiver: unknown) {
      const value = target.provider && Reflect.get(target.provider, prop, receiver);

      return value instanceof Function ? value.bind(target.provider) : value;
    },
  };

  constructor(private providerUrl: string, private name: string) {
    super();
    this.create();

    return new Proxy(this, this.handler);
  }

  private create() {
    if (this.provider) {
      this.events = [...this.events, ...this.provider._events];
      this.requests = { ...this.requests, ...this.provider._requests };
    }

    const provider = new ethers.providers.WebSocketProvider(this.providerUrl, this.provider?.network?.chainId);
    let pingInterval: NodeJS.Timer | undefined;
    let pongTimeout: NodeJS.Timeout | undefined;

    provider._websocket.on('open', () => {
      this.attempts = 0;

      pingInterval = setInterval(() => {
        provider._websocket.ping();

        pongTimeout = setTimeout(() => {
          provider._websocket.terminate();
          webSocketTimeoutsTotal.labels(this.name).inc();
        }, WEBSOCKET_PONG_TIMEOUT);
      }, WEBSOCKET_PING_INTERVAL);

      let event;
      while ((event = this.events.pop())) {
        provider._events.push(event);
        provider._startEvent(event);
      }

      for (const key in this.requests) {
        provider._requests[key] = this.requests[key];
        provider._websocket.send(this.requests[key].payload);
        delete this.requests[key];
      }

      webSocketStatus.labels(this.name).set(1);
    });

    provider._websocket.on('error', (err: Error) => {
      logger.error({ network: this.name, err }, 'WebSocket error: %s', err.message);
      webSocketErrorsTotal.labels(this.name).inc();
    });

    provider._websocket.on('pong', () => {
      if (pongTimeout) clearTimeout(pongTimeout);
    });

    provider._websocket.on('close', (code: number) => {
      provider._wsReady = false;

      if (pingInterval) clearInterval(pingInterval);
      if (pongTimeout) clearTimeout(pongTimeout);

      if (code !== 1000) {
        const sleep = getRandomInt(0, Math.min(WEBSOCKET_BACKOFF_CAP, WEBSOCKET_BACKOFF_BASE * 2 ** this.attempts++));

        setTimeout(() => this.create(), sleep);
      }

      webSocketClosesTotal.labels(this.name, code.toString()).inc();
      webSocketStatus.labels(this.name).set(0);
    });

    this.provider = provider;
  }
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
