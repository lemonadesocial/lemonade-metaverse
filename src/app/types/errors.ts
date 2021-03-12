export class AppError extends Error {
  public readonly name: string;
  public readonly code: string;
  public readonly status: number;
  public readonly expose: boolean;

  constructor(message: string, name: string, code: string, status: number, expose = true) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.code = code;
    this.status = status;
    this.expose = expose;

    Error.captureStackTrace(this);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string) {
    super(message, 'AuthenticationError', 'UNAUTHENTICATED', 401);
  }
}
