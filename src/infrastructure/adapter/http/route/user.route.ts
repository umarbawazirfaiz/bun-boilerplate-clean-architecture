import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { Route } from "./base.route";
import type BaseLogger from "../../../../common/logger/base-logger";
import type { IUserController } from "../controller/user.controller.interface";

class UserRoute implements Route {
  path: string = "/users";

  constructor(
    private readonly userController: IUserController,
    log: BaseLogger,
  ) {}

  init(instance: FastifyInstance, done: (err?: Error) => void): void {
    instance.get(`${this.path}`, (req: FastifyRequest, res: FastifyReply) =>
      this.userController.getUserListWithPaginate(req, res),
    );

    instance.get(`${this.path}/:id`, (req: FastifyRequest, res: FastifyReply) =>
      this.userController.getUserDetailsById(req, res),
    );

    done();
  }
}

export default UserRoute;
