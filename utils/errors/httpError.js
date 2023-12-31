export class HttpError extends Error {
  constructor(statusCode, message, body) {
    super(message);
    this.statusCode = statusCode;
    this.body = body;
  }
}
