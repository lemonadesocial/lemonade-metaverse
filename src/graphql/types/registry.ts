import { InputType } from 'type-graphql';

import { Registry } from '../../app/models/registry';
import { WhereInput } from './where-input';

@InputType()
export class RegistryWhere extends WhereInput(Registry) { }
