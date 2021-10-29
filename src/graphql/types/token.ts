import { InputType } from 'type-graphql';

import { Token } from '../../app/models/token';
import { WhereInput } from '../types/where-input';

@InputType()
export class TokenWhere extends WhereInput(Token) { }
