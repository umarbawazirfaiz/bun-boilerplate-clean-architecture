import type { User } from "./user";

export type UserResponse = Pick<User, "id" | "name" | "email"> & {
  updated_by: string;
  created_at: string;
};
