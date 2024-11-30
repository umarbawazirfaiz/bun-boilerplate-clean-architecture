import AppError from './app-error';

export class BadRequestError extends AppError {
  constructor(message: string = 'BAD_REQUEST') {
    super("20001", message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'NOT_FOUND') {
    super("20002", message, 404);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'INTERNAL_SERVER') {
    super("30000", message, 500);
  }
}