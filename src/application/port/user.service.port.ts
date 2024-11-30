import type { CreateUserRequest } from "../../domain/create-user-request";
import type { ListUserResponse } from "../../domain/list-user-reponse";
import type { ListUserRequest } from "../../domain/list-user-request";
import type { UpdateUserRequest } from "../../domain/update-user-request";

export interface UserServicePort {
  listUser(request: ListUserRequest): Promise<ListUserResponse[]>
  createUser(request: CreateUserRequest): Promise<void>;
  updateUser(request: UpdateUserRequest): Promise<void>;
}
