import UserService from "../../application/service/user.service";
import App from "../adapter/http/app";
import AppRoute from "../adapter/http/route/base.route";
import UserRoute from "../adapter/http/route/user.route";
import UserRepository from "../adapter/persistence/repository/user.repository";
import { type Config } from "../config";

class HttpServer {
    private config;
    private app;

    constructor(config: Config) {
        this.config = config
        this.app = new App(this.config);
    }

    public init() {
        const appRouter = new AppRoute();

        const userRepository = new UserRepository()
        const userService = new UserService(userRepository);
        const userRouter = new UserRoute(userService);

        this.app.initRoutes([appRouter, userRouter]);
        this.app.listen();

        process.on("uncaughtException", (err) => {
            // logger.fatal(err);
            process.exit(1);
          });
        
        process.on("unhandledRejection", (err) => {
            // logger.fatal(err);
            this.app.getServer().close(() => process.exit(1));
        });
    }

}

export default HttpServer;