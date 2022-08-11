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
      this._indexer = createIndexer(this.indexerUrl);
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
    if (this._indexer) {
      this._indexer.stop();
    }

    if (this._provider && this._provider.destroy) {
      await this._provider.destroy();
    }
  }
}

export const networkMap: Record<string, Network> = {};
export const networks: Network[] = [];

export async function init() {
  const docs = await NetworkModel.find({ active: true }).lean();

  networks.length = docs.length;

  docs.forEach((doc, i) =>
    networkMap[doc.name] = networks[i] = new Network(doc)
  );
}

export async function close() {
  await Promise.all(networks.map((network) =>
    network.close()
  ));
}
