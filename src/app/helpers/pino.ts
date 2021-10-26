import { pino } from 'pino';

import { isDevelopment, slackWebhookUrl } from '../../config';

const targets: pino.TransportTargetOptions[] = [
  { level: 'fatal', target: 'pino/file', options: { destination: '/dev/stderr' } },
  { level: 'trace', target: 'pino/file', options: { destination: '/dev/stdout' } },
];

if (slackWebhookUrl) {
  const level = isDevelopment ? 'debug' : 'info';
  const options = {
    excludedKeys: { imageUrl: 0 },
    imageUrlKey: 'imageUrl',
    keepAlive: true,
    webhookUrl: slackWebhookUrl,
  };

  targets.push({ level, target: '../../../lib/logger.mjs', options });
}

export const logger = pino(
  pino.transport({ targets })
);
