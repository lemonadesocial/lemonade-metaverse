import { Network as NetworkBase, NetworkModel } from '../models/network';

import { createIndexer, Indexer } from './indexer';
import { createProvider, Provider } from './provider';

export class Network extends NetworkBase {
  private _indexer?: Indexer;
  private _provider?: Provider;

  public constructor(data: NetworkBase) {
    super();

    Object.assign(this, data);
  }

  public indexer() {
    if (!this._indexer) {
      this._indexer = createIndexer(this.indexerUrl, this.name);
    }

    return this._indexer;
  }

  public provider() {
    if (!this._provider) {
      this._provider = createProvider(this.providerUrl, this.name);
    }

    return this._provider;
  }

  public async close() {
    if (this._provider && this._provider.destroy) {
      await this._provider.destroy();
    }
  }
}

export const networks: Network[] = [];
export const networkMap: Record<string, Network> = {};

export async function init() {
  const docs = await NetworkModel.find({ active: true }).lean();

  docs.forEach((doc, i) =>
    networks[i] = networkMap[doc.name] = new Network(doc)
  );
}

export async function close() {
  const promises: Promise<void>[] = [];

  let network;
  while ((network = networks.pop())) {
    delete networkMap[network.name];

    promises.push(network.close());
  }

  if (promises.length) {
    await Promise.all(promises);
  }
}
