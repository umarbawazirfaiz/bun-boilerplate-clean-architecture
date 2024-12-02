import type { User } from "./user";

export type UpdateUserRequest = Pick<User, "name" | "password">;