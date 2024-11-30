import Fastify, { type FastifyInstance } from 'fastify';
import type { Config } from '../../config';
import type { Route } from './route/base.route';
import AppError from '../../../common/errors/app-error';
import { NotFoundError } from '../../../common/errors/http-error';

class App {
    public app: FastifyInstance;
    public env: string;
    public port: number;

    constructor(config: Config) {
        this.app = Fastify({
            logger: {
              level: config.logLevel,
              serializers: {
                req(request) {
                  return {
                    traceId: request.headers['x-trace-id'] || crypto.randomUUID(),
                    path: request.url,
                    method: request.method,
                    headers: request.headers,
                    body: request.body || '',
                  };
                },
                res(reply) {
                  return {
                    status: reply.statusCode,
                    headers: reply.getHeaders(),
                    body: reply.payload,
                  };
                },
              },
              redact: ['headers.authorization'],
            },
            genReqId: function (req) {
              // header best practice: don't use "x-" https://www.rfc-editor.org/info/rfc6648 and keep it lowercase
              return (req.headers['request-id'] as string) ?? crypto.randomUUID();
            },
            ignoreDuplicateSlashes: true,
            ajv: {
              customOptions: {
                keywords: ['example'],
              },
            },
          });
        this.env = config.nodeEnv;
        this.port = config.port;
    }

    public listen() {
        this.app.listen({
            port: this.port
        }, () => {
            this.app.log.info(`[server]: Server is running on port ${this.port}`);
        });

        // this.app.listen({ port: this.port }, (err, address) => {
        //   if (err) {
        //     this.app.log.error(err)
        //     process.exit(1)
        //   }
        //   this.app.log.info(`server listening on ${address}`)
        // })
      
    }

    public getServer(): FastifyInstance {
        return this.app;
    }

    public initRoutes(routes: Route[]) {
        routes.forEach(route => {
            this.app.register(function (instance, opts, next) {
                route.init(instance, opts, next);
              
                next()
              }, { prefix: '/v1' })
        });

        this.app.addHook('onRequest', async (request, reply) => {
          if (!request.headers['x-trace-id']) {
            request.headers['x-trace-id'] = crypto.randomUUID();
          }
        });
        
        // Route Example
        this.app.get('/api/test', async (request, reply) => {
          const { is_test } = request.query;
          this.app.log.info({
            layer: 'CONTROLLER',
            methodName: 'createUser',
            request: { id: '1', name: 'Umar', email: null },
            response: { id: '1', name: 'Umar', email: null },
            processTime: 2,
          });
        
          if (is_test === 'true') {
            return { message: 'Test successful' };
          } else {
            reply.status(400);
            return { message: 'Test failed' };
          }
        });

        this.app.setNotFoundHandler((request, reply) => {
          throw new NotFoundError();
        });

        this.app.setErrorHandler((error, request, reply) => {
          const response = {
            code: error instanceof AppError ? error.code : '30000',
            message: error.message || 'INTERNAL_SERVER_ERROR',
            data: null,
          };
        
          reply.status(error.statusCode || 500).send(response);
        });
    }
}

export default App;
