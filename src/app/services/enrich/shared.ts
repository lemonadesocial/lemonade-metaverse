import { Token } from '../../models/token';

export const ORDERS_KEY = 'enrich:orders';
export const QUEUE_NAME = 'bullmq:enrich';

export interface JobData {
  token: Token;
}
