import { BaseLogger } from 'pino';

export interface State {
  logger: BaseLogger;
}

export type Context = Record<string, any>;

export class AppError extends Error {
  public readonly name: string;
  public readonly status: number;
  public readonly expose: boolean;

  constructor(name: string, status: number, message: string, expose: boolean) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.status = status;
    this.expose = expose;

    Error.captureStackTrace(this);
  }
}
