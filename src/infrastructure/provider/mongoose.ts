import mongoose from "mongoose";
import type { Config } from "../config";

class Mongoose {
  mongoUri: string;

  constructor(config: Config) {
    this.mongoUri = config.mongoUri;
  }

  init() {
    mongoose
      .connect(this.mongoUri)
      .then(() => {
        console.log("Connected to MongoDB successfully");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });
  }
}

export default Mongoose;