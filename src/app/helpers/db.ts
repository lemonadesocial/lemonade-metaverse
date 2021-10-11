import mongoose from 'mongoose';

import { databaseDebug, databaseUrl } from '../../config';

mongoose.set('debug', databaseDebug);

export const connect = async (): Promise<void> => {
  await mongoose.connect(databaseUrl, { serverSelectionTimeoutMS: 1000 });
};

export const disconnect = async (): Promise<void> => {
  await mongoose.disconnect();
};
