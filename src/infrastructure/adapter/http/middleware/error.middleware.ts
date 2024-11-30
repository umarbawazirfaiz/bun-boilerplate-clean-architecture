// import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
// import { AppError } from '../../../../common/errors/app-error';
// import logger from '../../../logger/logger';

// export const errorHandler = (
//   error: FastifyError, 
//   request: FastifyRequest, 
//   reply: FastifyReply
// ) => {
//   // Log the error
//   logger.error({
//     message: error.message,
//     stack: error.stack,
//     method: request.method,
//     url: request.url,
//   });

//   // Handle known application errors
//   if (error instanceof AppError) {
//     return reply.status(error.statusCode).send({
//       status: 'error',
//       message: error.message,
//     });
//   }

//   // Handle unexpected errors
//   reply.status(500).send({
//     status: 'error',
//     message: 'Internal Server Error',
//   });
// };