import type { UserRepositoryPort } from '../port/user.repository.port';
import type { UserServicePort } from '../port/user.service.port';
import type { CreateUserRequest } from '../../domain/create-user-request';
import type { UpdateUserRequest } from '../../domain/update-user-request';
import type { ListUserResponse, UserResponse } from '../../domain/list-user-reponse';
import type { ListUserRequest } from '../../domain/list-user-request';
import type { User } from '../../domain/user';

class UserService implements UserServicePort {
  constructor(
    private userRepository: UserRepositoryPort
  ) {}
  async listUser(request: ListUserRequest): Promise<ListUserResponse> {
    const users: Partial<User>[] = await this.userRepository.findAll()
    const list: Partial<UserResponse>[] = users.map((v) =>{
      return {
        name: v.name,
        email: v.email,
        created_by: v.created_by,
        created_at: v.created_at?.toUTCString(),
      }
    })

    const res: ListUserResponse = {
      page: 0,
      size: 1,
      list: list
    }

    return res
  }

  createUser(request: CreateUserRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }

  updateUser(request: UpdateUserRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default UserService;