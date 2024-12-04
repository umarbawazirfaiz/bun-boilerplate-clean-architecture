export type BaseResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export const createBaseResponse = <T>(
  code: string,
  message: string,
  data: T,
): BaseResponse<T> => {
  return {
    code,
    message,
    data,
  };
};

export const successResponse = <T>(
  data: T,
  code: string = "20000",
  message: string = "SUCCESS",
): BaseResponse<T> => {
  return {
    code,
    message,
    data,
  };
};
