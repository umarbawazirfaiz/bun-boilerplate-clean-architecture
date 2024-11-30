import { type Static, Type } from '@sinclair/typebox';
import envSchema from 'env-schema';

enum NodeEnv {
  development = 'development',
  production = 'production',
  test = 'test',
}

export enum LogLevel {
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
}

const schema = Type.Object({
  PORT: Type.Number({ default: 3000 }),
  NODE_ENV: Type.Enum(NodeEnv),
  LOG_LEVEL: Type.Enum(LogLevel),
});

const env = envSchema<Static<typeof schema>>({
  dotenv: true,
  schema,
});

export type Config = {
  nodeEnv: NodeEnv,
  isDevelopment: boolean,
  isProduction: boolean,
  logLevel: LogLevel,
  port: number
}; 

export const getConfig = (): Config => {
  return {
    nodeEnv: env.NODE_ENV,
    isDevelopment: env.NODE_ENV === NodeEnv.development,
    isProduction: env.NODE_ENV === NodeEnv.production,
    logLevel: env.LOG_LEVEL,
    port: env.PORT
  }
};