import type { GetUserResponse } from "src/domain/get-user-response";
import type { GetUserListResponse } from "../../domain/get-user-list-reponse";
import type { GetUserListRequest } from "../../domain/get-user-list-request";
import type { CreateUserRequest } from "../../domain/create-user-request";
import type { UpdateUserRequest } from "../../domain/update-user-request";

export interface UserServicePort {
  getUserListWithPaginate(
    request: GetUserListRequest,
  ): Promise<GetUserListResponse>;
  getUserDetailsById(id: string): Promise<GetUserResponse>;
  createUser(request: CreateUserRequest): Promise<void>;
  updateUser(request: UpdateUserRequest): Promise<void>;
  deleteUser(id: string): Promise<void>;
}
