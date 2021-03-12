import { Response } from 'node-fetch';

class ResponseError extends Error {
  private readonly response: Response;
  private readonly body: any;

  public constructor(response: Response, body: any) {
    super(response.statusText);

    this.response = response;
    this.body = body;
  }

  public toString() {
    const { response, body } = this;

    let err = `${response.statusText} (${response.status})`;

    if (body) {
      const error = body.errors?.[0] || body.error || body;
      const message = error.message || error;

      err += `: ${message}`;
    }

    return err;
  }
}

export const createError = async (response: Response) => {
  let body;
  try {
    body = await response.json();
  } catch {
    body = response.body;
  }

  return new ResponseError(response, body);
}
