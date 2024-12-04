import mongoose from "mongoose";
import type { Config } from "../config";
import type BaseLogger from "../../common/logger/base-logger";

class Mongoose {
  mongoUri: string;

  constructor(
    config: Config,
    private log: BaseLogger,
  ) {
    this.mongoUri = config.mongoUri;
  }

  init() {
    mongoose
      .connect(this.mongoUri)
      .then(() => {
        this.log.info("[database]: Connected to MongoDB successfully");
      })
      .catch((error) => {
        this.log.error("Error connecting to MongoDB:", error);
      });
  }
}

export default Mongoose;
