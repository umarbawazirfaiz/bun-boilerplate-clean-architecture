import type { UserResponse } from "./user-response";

export type GetUserListResponse = {
  page: number;
  limit: number;
  total_page: number;
  total: number;
  list: Partial<UserResponse>[];
};
