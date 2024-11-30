import type { UserRepositoryPort } from '../port/user.repository.port';
import type { UserServicePort } from '../port/user.service.port';
import type { CreateUserRequest } from '../../domain/create-user-request';
import type { UpdateUserRequest } from '../../domain/update-user-request';

class UserService implements UserServicePort {
  constructor(
    private userRepository: UserRepositoryPort
  ) {}

  createUser(request: CreateUserRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }

  updateUser(request: UpdateUserRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default UserService;