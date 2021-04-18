import { BulkWriteOperation } from 'mongodb';
import { Histogram } from 'prom-client';
import * as assert from 'assert';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import fetch, { Response } from 'node-fetch';
import Queue from 'bull';

import { OfferModel, Offer } from '../models/offer';

import { BuffereredQueue } from '../utils/buffered-queue';
import { schema } from '../utils/url';

import { ipfsGatewayUri } from '../../config';

const writer =  new BuffereredQueue<BulkWriteOperation<Offer>>(
  async (operations) => OfferModel.bulkWrite(operations).then(),
  2000,
);

const durationSeconds = new Histogram({
  name: 'nft_enrich_duration_seconds',
  help: 'Duration of NFT enrich in seconds',
});

export const queue = new Queue<{
  id: string;
  token_uri: string;
}>('ENRICH_QUEUE');

export const process = async (
  onReady?: () => void,
) => {
  const httpAgent = new http.Agent({ keepAlive: true });
  const httpsAgent = new https.Agent({ keepAlive: true });

  if (onReady) {
    await queue.isReady();
    onReady();
  }

  await queue.process(async function (job) {
    const stopTimer = durationSeconds.startTimer();

    const { id, token_uri } = job.data;

    let response: Response | undefined;
    switch (schema(token_uri)) {
      case 'http':
        response = await fetch(token_uri, { agent: httpAgent });
        break;
      case 'https':
        response = await fetch(token_uri, { agent: httpsAgent });
        break;
      case 'ipfs':{
        const url = path.join(ipfsGatewayUri, 'ipns', token_uri.substr('ipfs://'.length))
        response = await fetch(url, { agent: httpsAgent });
        break;
      }
    }

    assert.ok(response?.ok);

    writer.enqueue({
      updateOne: {
        filter: { id },
        update: { $set: { token_metadata: await response.json() } },
      },
    });

    stopTimer();
  });
};

export const stop = async () => {
  await queue.close();
  await writer.flush();
};
