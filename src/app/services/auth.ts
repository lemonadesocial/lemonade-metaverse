import * as assert from 'assert';
import * as jwt from 'jsonwebtoken';

import { logger } from '../helpers/pino';

import { jwtKey } from '../../config';

import { ParameterizedContext } from '../types';
import { AuthenticationError } from '../types/errors';

export interface Auth {
  user: string;
}

export const authenticate = async (
  { request }: ParameterizedContext,
): Promise<Auth> => {
  const token = request.headers.authorization?.split(' ')[1];

  assert.ok(token, new AuthenticationError('The authorization token is missing.'));

  let payload: string | Record<string, unknown>;
  try {
    payload = jwt.verify(token, jwtKey) as typeof payload;
  } catch (err) {
    logger.debug(err);

    throw new AuthenticationError('The authorization token is invalid.');
  }

  assert.ok(typeof payload === 'object' && typeof payload.user === 'string', new AuthenticationError('The authorization token payload is invalid.'));

  return { user: payload.user };
};
