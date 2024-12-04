import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import AppError from "../../../../common/errors/app-error";

export const errorMiddleware = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const res = {
    code: error instanceof AppError ? error.code : "30000",
    message: error.message || "INTERNAL_SERVER_ERROR",
    data: null,
  };

  const startTime = request.logContext?.startTime;
  const processTime = Date.now() - startTime!;

  const errorInfo = {
    message: error.message,
    exceptionName: error.name,
    stackTrace: error.stack,
    causedBy: error.cause ? (error.cause as Error).message : undefined,
  };

  request.logger.error("Http request error", { errorInfo, processTime });

  reply.status(error.statusCode || 500).send(res);
};
