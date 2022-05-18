import type { FastifyContext } from 'apollo-server-fastify';
import type { FastifyLoggerInstance } from 'fastify';
import type DataLoader from 'dataloader';

export interface Context {
  ctx: FastifyContext | null;
  dataLoaders?: Record<string, DataLoader<string, unknown> | undefined>;
  logger: FastifyLoggerInstance;
}
