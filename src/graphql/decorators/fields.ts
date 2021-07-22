import { createParamDecorator } from 'type-graphql';

import { getFieldTree } from '../utils/field';

export const Fields = (): ParameterDecorator =>
  createParamDecorator(({ info }) => getFieldTree(info));
