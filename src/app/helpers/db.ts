import mongoose from 'mongoose';

import { databaseDebug, databaseUrl } from '../../config';

mongoose.set('debug', databaseDebug);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

export const connect = async (
  options?: mongoose.ConnectionOptions,
) => {
  return await mongoose.connect(databaseUrl, options);
};

export const disconnect = async () => {
  await mongoose.disconnect();
};
