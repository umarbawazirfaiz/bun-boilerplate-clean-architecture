import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";

export interface Route {
  path: string;
  init(
    instance: FastifyInstance,
    done: (err?: Error) => void
  ): void;
}

class BaseRoute implements Route {
  path: string = "/ping";

  public init(
    instance: FastifyInstance,
    done: (err?: Error) => void
  ): void {
    instance.get(`${this.path}`, this.ping);

    done();
  }

  private ping() {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      reply.code(200).send({ pong: "it worked!" });
    };
  }
}

export default BaseRoute;