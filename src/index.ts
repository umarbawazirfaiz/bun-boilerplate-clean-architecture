
import App from "./infrastructure/adapter/http/app";
import { getConfig } from "./infrastructure/config";
import HttpServer from "./infrastructure/provider/http-server";
import Mongoose from "./infrastructure/provider/mongoose";

async function init() {
  const config = getConfig();
  const httpServer = new HttpServer(config)
  const mongoose = new Mongoose(config)
  
  mongoose.init();

  httpServer.init();
}

init();
