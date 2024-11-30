import type { UserResponse } from "./user-response";

export type ListUserResponse = {
  page: number;
  size: number;
  list: Partial<UserResponse>[];
};
