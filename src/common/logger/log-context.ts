export interface LogContext {
  traceId: string;
  transactionId?: string;
  serviceName?: string;
  errorInfo?: unknown;
  startTime?: number;
  processTime?: number;
  applicationLayer?: ApplicationLayerLog[];
  thirdParty?: unknown[];
}

export interface HttpLog extends LogContext {
  transactionId?: string;
  hostname?: string;
  path?: string;
  method?: string;
  request?: {
    headers?: Record<string, string>;
    body?: unknown;
    parameters?: Record<string, string[]>;
    method?: string;
    url?: string;
    queryString?: string;
  };
  response?: {
    headers?: Record<string, string>;
    status?: number;
    body?: unknown;
  };
}

interface ApplicationLayerLog {
  layer: "SERVICE" | "CONTROLLER" | "REPOSITORY";
  methodName: string;
  request: unknown;
  response: unknown;
  processTime: number;
}
