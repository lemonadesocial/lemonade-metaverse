import * as assert from 'assert';
import * as joi from 'joi';
import * as jwt from 'jsonwebtoken';

import { logger } from '../../helpers/pino';

import { Auth } from './types';
import { AuthenticationError } from '../../types/errors';
import { ParameterizedContext } from '../../types';

import { jwtKey } from '../../../config';

const schema = joi.object<Auth>({
  user: joi.string().required(),
  enjin_user: joi.number(),
}).required();

function validate(value: unknown): asserts value is Auth {
  joi.assert(value, schema, { allowUnknown: true });
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

  try {
    validate(payload);
  } catch (err) {
    logger.debug(err);
    throw new AuthenticationError('The authorization token payload is invalid.')
  }

  return payload;
};
