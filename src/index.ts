
import App from "./infrastructure/adapter/http/app";
import { getConfig } from "./infrastructure/config";
import HttpServer from "./infrastructure/provider/http-server";

async function init() {
  const config = getConfig();
  const httpServer = new HttpServer(config)

  httpServer.init();
}

init();
