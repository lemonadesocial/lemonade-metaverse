import { InputType, ObjectType } from 'type-graphql';

import { PaginatedResponse } from '../types/paginated-response';
import { Token } from '../../app/models/token';
import { WhereInput } from '../types/where-input';

@InputType()
export class TokenWhere extends WhereInput(Token) { }

@ObjectType()
export class TokensResponse extends PaginatedResponse(Token) { }
