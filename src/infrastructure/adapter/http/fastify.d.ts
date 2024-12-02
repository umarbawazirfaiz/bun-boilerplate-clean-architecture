// fastify.d.ts
import 'fastify';
import type { HttpLog } from '../../../common/logger/log-context';

declare module 'fastify' {
    interface FastifyRequest {
        logger?: Logger;
        logContext?: HttpLog;
    }
}