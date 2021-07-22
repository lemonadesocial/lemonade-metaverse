import { Order } from '../../models/order';

export const QUEUE_NAME = 'bullmq:enrich';

export interface JobData {
  order: Order;
  upserted: boolean;
}
