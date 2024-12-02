import type { UserRepositoryPort } from "../port/user.repository.port";
import type { UserServicePort } from "../port/user.service.port";
import type { CreateUserRequest } from "../../domain/create-user-request";
import type { UpdateUserRequest } from "../../domain/update-user-request";
import type { ListUserResponse } from "../../domain/list-user-reponse";
import type { ListUserRequest } from "../../domain/list-user-request";
import type { User } from "../../domain/user";
import type { UserResponse } from "../../domain/user-response";
import type BaseLogger from "../../common/logger/base-logger";

class UserService implements UserServicePort {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly log: BaseLogger
  ) {}

  async listUser({
    page,
    limit,
    sortBy,
    sortType,
  }: ListUserRequest): Promise<ListUserResponse> {
    const users: Partial<User>[] = await this.userRepository.findAll(
      page,
      limit,
      sortBy,
      sortType
    );

    const list: Partial<UserResponse>[] = users.map((v) => {
      return {
        name: v.name,
        email: v.email,
        created_by: v.created_by,
        created_at: v.created_at?.toUTCString(),
      };
    });

    // Count total documents
    const total = await this.userRepository.getTotalData();

    const res: ListUserResponse = {
      page: page,
      limit: limit,
      total_page: Math.ceil(total / limit),
      total,
      list: list,
    };

    return res;
  }

  createUser(request: CreateUserRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateUser(request: UpdateUserRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default UserService;
