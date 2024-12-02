import Fastify, { type FastifyInstance } from "fastify";
import type { Config } from "../../config";
import type { Route } from "./route/base.route";
import { NotFoundError } from "../../../common/errors/http-error";
import { v4 as uuidv4 } from "uuid";
import BaseLogger from "../../../common/logger/base-logger";
import type { HttpLog } from "../../../common/logger/log-context";
import { errorMiddleware } from "./middleware/error.middleware";

class App {
  private app: FastifyInstance;
  private port: number;
  private serviceName: string;

  constructor(config: Config, private readonly log: BaseLogger) {
    this.app = Fastify();
    this.serviceName = "user_service";
    this.port = config.port;
  }

  public listen() {
    this.app.listen({
        port: this.port
    }, () => {
        this.log.info(`[server]: Server is running on port ${this.port}`);
    });
  }

  public getServer(): FastifyInstance {
    return this.app;
  }

  public initRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.register(
        function (instance, opts, next) {
          route.init(instance, next);

          next();
        },
        { prefix: "/v1" }
      );
    });

    this.app.addHook("onRequest", async (request, reply) => {
      if (!request.headers["x-trace-id"]) {
        request.headers["x-trace-id"] = crypto.randomUUID();
      }

      const headers: Record<string, string> = Object.fromEntries(
        Object.entries(request.headers).map(([key, value]) => [
          key,
          String(value),
        ])
      );

      const logContext: HttpLog = {
        traceId: (request.headers["x-transaction-id"] as string) || uuidv4(),
        serviceName: this.serviceName,
        request: {
          url: request.raw.url || undefined,
          method: request.method || undefined,
          headers: headers,
          parameters: request.params
            ? Object.fromEntries(
                Object.entries(request.params).map(([key, value]) => [
                  key,
                  [String(value)],
                ])
              )
            : undefined,
          queryString: request.query
            ? new URLSearchParams(
                request.query as Record<string, string>
              ).toString()
            : undefined,
          body: request.body || undefined,
        },
        startTime: Date.now(),
      };

      request.logContext = logContext;

      this.log.createLogContext(logContext);

      request.logger = this.log;
    });

    this.app.addHook("onSend", async (request, reply, payload) => {
      if (reply.statusCode < 400) {
        const startTime = request.logContext?.startTime;
        const processTime = Date.now() - startTime!;

        const response = {
          headers: reply.getHeaders() as Record<string, string>,
          status: reply.statusCode,
          body: payload,
        };
        this.log.info("Http request success", { response, processTime });
      }
    });

    this.app.setNotFoundHandler((request, reply) => {
      throw new NotFoundError();
    });

    this.app.setErrorHandler(errorMiddleware)
  }
}

export default App;
