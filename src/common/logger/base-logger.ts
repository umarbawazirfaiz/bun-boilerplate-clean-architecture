import pino, { type Logger } from "pino";
import type { Config } from "../../infrastructure/config";
import type { LogContext } from "./log-context";
import { v4 as uuidv4 } from "uuid";

class BaseLogger {
  private logger: Logger;
  private logContext: Logger<keyof LogContext, boolean> | undefined;

  constructor(config: Config) {
    this.logger = pino({
      level: config.logLevel,
      messageKey: "message",
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    });
  }

  createLogContext(context?: object) {
    const traceId = uuidv4();

    this.logContext = this.logger.child({
      traceId,
      ...context,
    });

    return this.logContext;
  }

  getLogContext() {
    return this.logContext;
  }

  info(message: string, context?: object): void {
    if (this.logContext) {
      const log = this.logContext;
      log.info(context || {}, message);
      return;
    }
    this.logger.info(context || {}, message);
  }

  trace(message: string, context?: object): void {
    if (this.logContext) {
      const log = this.logContext;
      log.trace(context || {}, message);
      return;
    }
    this.logger.trace(context || {}, message);
  }

  error(message: string, context?: object): void {
    if (this.logContext) {
      const log = this.logContext;
      log.error(context || {}, message);
      return;
    }
    this.logger.error(context || {}, message);
  }

  fatal(context?: object | unknown): void {
    if (this.logContext) {
      const log = this.logContext;
      log.fatal(context || {});
      return;
    }
    this.logger.fatal(context);
  }
}

export default BaseLogger;
