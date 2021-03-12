import pino from 'pino';

import { isDevelopment } from '../../config';

export const logger = pino({
  formatters: { level: (level) => ({ level }) },
  level: isDevelopment ? 'debug' : 'info',
});
