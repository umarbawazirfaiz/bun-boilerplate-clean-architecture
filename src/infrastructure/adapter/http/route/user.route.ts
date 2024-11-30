import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { Route } from "./base.route";
import { UserController } from "../controller/user.controller";
import type { UserServicePort } from "../../../../application/port/user.service.port";

class UserRoute implements Route {
  path: string = "/users";
  userController;

  constructor(userService: UserServicePort) {
    this.userController = UserController(userService);
  }

  // Implement the method with the required signature
  init(
    instance: FastifyInstance,
    opts: FastifyPluginOptions,
    done: (err?: Error) => void
  ): void {
    instance.get(`${this.path}`, this.userController.findAll);

    done();
  }
}

export default UserRoute;
