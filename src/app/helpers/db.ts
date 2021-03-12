import mongoose from 'mongoose';

import { databaseDebug, databaseUrl } from '../../config';

mongoose.set('debug', databaseDebug);

export const connect = async (options?: mongoose.ConnectionOptions) => {
  return await mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ...options,
  });
};

export const disconnect = async () => {
  await mongoose.disconnect();
};
