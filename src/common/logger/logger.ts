// import pino from 'pino';
// import { env } from '../config/env';

// const logger = pino({
//   level: env.LOG_LEVEL,
//   transport: env.NODE_ENV !== 'production' ? {
//     target: 'pino-pretty',
//     options: {
//       colorize: true,
//       translateTime: 'HH:MM:ss Z',
//       ignore: 'pid,hostname',
//     },
//   } : undefined,
// });

// export default logger;