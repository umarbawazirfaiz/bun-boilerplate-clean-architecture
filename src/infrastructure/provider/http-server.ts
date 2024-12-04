import UserService from "../../application/service/user.service";
import BaseLogger from "../../common/logger/base-logger";
import App from "../adapter/http/app";
import UserController from "../adapter/http/controller/user.controller";
import AppRoute from "../adapter/http/route/base.route";
import UserRoute from "../adapter/http/route/user.route";
import { UserEntityModel } from "../adapter/persistence/entity/user.entity";
import UserRepository from "../adapter/persistence/repository/user.repository";
import { type Config } from "../config";

class HttpServer {
  private app;

  constructor(
    private config: Config,
    private logger: BaseLogger,
  ) {
    this.config = config;
    this.app = new App(this.config, logger);
  }

  public async init() {
    const appRouter = new AppRoute();

    const userRepository = new UserRepository(UserEntityModel);
    const userService = new UserService(userRepository, this.logger);
    const userController = new UserController(userService, this.logger);
    const userRouter = new UserRoute(userController, this.logger);

    this.app.initRoutes([appRouter, userRouter]);
    this.app.listen();

    process.on("uncaughtException", (err) => {
      this.logger.fatal(err);
      process.exit(1);
    });

    process.on("unhandledRejection", (err) => {
      this.logger.fatal(err);
      this.app.getServer().close(() => process.exit(1));
    });
  }
}

export default HttpServer;
