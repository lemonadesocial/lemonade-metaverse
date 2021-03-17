import { ParameterizedContext } from '../app/types';
import { Auth } from '../app/services/auth';

export interface Context {
  auth?: Auth;
  app: ParameterizedContext;
}
