import { createParamDecorator } from 'type-graphql';

import { getFieldTree } from '../utils/field';

export const Fields = () => createParamDecorator(({ info }) => getFieldTree(info));
