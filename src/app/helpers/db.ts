import mongoose from 'mongoose';

import { databaseDebug, databaseUrl } from '../../config';

mongoose.set('debug', databaseDebug);

export const connect = async (options?: mongoose.MongooseOptions): Promise<typeof mongoose> => {
  return await mongoose.connect(databaseUrl, options);
};

export const disconnect = async (): Promise<void> => {
  await mongoose.disconnect();
};
