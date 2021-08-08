import { Order } from '../../models/order';
import { Token } from '../../models/token';

export const QUEUE_NAME = 'bullmq:enrich';

export interface JobData {
  order: Order;
  token: Token;
}
