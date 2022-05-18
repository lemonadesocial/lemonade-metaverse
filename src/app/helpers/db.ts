import mongoose from 'mongoose';

import { databaseDebug, databaseUrl } from '../../config';

mongoose.set('debug', databaseDebug);

export async function connect() {
  await mongoose.connect(databaseUrl, { serverSelectionTimeoutMS: 1000 });
}

export async function disconnect() {
  await mongoose.disconnect();
}
