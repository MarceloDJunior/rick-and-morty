export class UnexpectedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UnexpectedError';
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
