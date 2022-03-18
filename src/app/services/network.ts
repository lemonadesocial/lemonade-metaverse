import { Network as NetworkBase, NetworkModel } from '../models/network';

import { getIndexer, Indexer } from './indexer';
import { getProvider, Provider } from './provider';

export class Network extends NetworkBase {
  private _indexer?: Indexer;
  private _provider?: Provider;

  public constructor(data: NetworkBase) {
    super();

    Object.assign(this, data);
  }

  public indexer() {
    if (!this._indexer) {
      this._indexer = getIndexer(this);
    }

    return this._indexer;
  }

  public provider() {
    if (!this._provider) {
      this._provider = getProvider(this);
    }

    return this._provider;
  }

  public close() {
    if (this._indexer) {
      this._indexer.stop();
    }

    if (this._provider) {
      this._provider.close?.();
    }
  }
}

export const networks: Record<string, Network> = {};

export async function start(): Promise<void> {
  const docs = await NetworkModel.find({ active: true }).lean();

  for (const network of docs) {
    networks[network.name] = new Network(network);
  }
}

export function close(): void {
  for (const key in networks) {
    networks[key].close();
  }
}
