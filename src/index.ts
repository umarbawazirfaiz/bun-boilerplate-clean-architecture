import BaseLogger from "./common/logger/base-logger";
import { getConfig } from "./infrastructure/config";
import HttpServer from "./infrastructure/provider/http-server";
import Mongoose from "./infrastructure/provider/mongoose";

async function init() {
  const config = getConfig();
  const logger = new BaseLogger(config);
  const httpServer = new HttpServer(config, logger);
  const mongoose = new Mongoose(config, logger);

  mongoose.init();

  httpServer.init();
}

init();
