import { pino } from 'pino';

import { slackWebhookUrl } from '../../config';

const targets: pino.TransportTargetOptions[] = [
  { level: 'trace', target: 'pino/file', options: { destination: 1 } },
  { level: 'fatal', target: 'pino/file', options: { destination: 2 } },
];

if (slackWebhookUrl) {
  const options = {
    excludedKeys: { imageUrl: 0 },
    imageUrlKey: 'imageUrl',
    keepAlive: true,
    webhookUrl: slackWebhookUrl,
  };

  targets.push({ level: 'info', target: '../../../lib/logger.mjs', options });
}

export const logger = pino(
  { level: 'trace' },
  pino.transport({ targets })
);
