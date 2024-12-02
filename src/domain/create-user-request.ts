import type { User } from "./user";

export type CreateUserRequest = Pick<User, "name" | "email" | "password"> & {
  re_password: string;
};
