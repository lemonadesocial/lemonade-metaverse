import { Offer } from '../../models/offer';

export const QUEUE_NAME = 'enrich';

export interface JobData {
  offer: Offer
  upserted: boolean;
}
