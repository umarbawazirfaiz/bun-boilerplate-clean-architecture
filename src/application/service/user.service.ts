import type { UserRepositoryPort } from "../port/user.repository.port";
import type { UserServicePort } from "../port/user.service.port";
import type { CreateUserRequest } from "../../domain/create-user-request";
import type { UpdateUserRequest } from "../../domain/update-user-request";
import type { User } from "../../domain/user";
import type { UserResponse } from "../../domain/user-response";
import type BaseLogger from "../../common/logger/base-logger";
import type { GetUserListResponse } from "src/domain/get-user-list-reponse";
import type { GetUserListRequest } from "src/domain/get-user-list-request";
import type { GetUserResponse } from "src/domain/get-user-response";

class UserService implements UserServicePort {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly log: BaseLogger,
  ) {}

  async getUserListWithPaginate({
    page,
    limit,
    sortBy,
    sortType,
  }): Promise<GetUserListResponse> {
    const users: Partial<User>[] = await this.userRepository.findAll(
      page,
      limit,
      sortBy,
      sortType,
    );

    const list: Partial<UserResponse>[] = users.map((v) => {
      return {
        name: v.name,
        email: v.email,
        created_by: v.created_by,
        created_at: v.created_at?.toUTCString(),
      };
    });

    const total = await this.userRepository.getTotalData();

    return {
      page: page,
      limit: limit,
      total_page: Math.ceil(total / limit),
      total,
      list: list,
    };
  }

  getUserDetailsById(id: string): Promise<GetUserResponse> {
    throw new Error("Method not implemented.");
  }

  createUser(request: CreateUserRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateUser(request: UpdateUserRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteUser(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default UserService;
