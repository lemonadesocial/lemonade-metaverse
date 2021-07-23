import { pino } from 'pino';

import { isDevelopment, slackWebhookUrl } from '../../config';

const targets: pino.TransportTargetOptions[] = [
  { level: 'fatal', target: '#pino/file', options: { destination: '/dev/stderr' } },
  { level: 'trace', target: '#pino/file', options: { destination: '/dev/stdout' } },
];

if (slackWebhookUrl) {
  const level = isDevelopment ? 'debug' : 'info';

  targets.push(
    { level, target: '../../../lib/logger.mjs', options: { slackWebhookUrl } }
  );
}

export const logger = pino(
  pino.transport({ targets })
);
