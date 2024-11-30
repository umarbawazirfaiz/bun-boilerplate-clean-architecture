import type { UserRepositoryPort } from "../../../../application/port/user.repository.port";
import type { User } from "../../../../domain/user";
import { UserEntityModel, type UserEntity } from "../entity/user.entity";

class UserRepository implements UserRepositoryPort {
  async findAll(): Promise<Partial<User>[]> {
    const userEntities = await UserEntityModel.find();
    const users: Partial<User>[] = userEntities.map((v) => {
      return {
        id: v.id,
        name: v.name,
        email: v.email,
        created_by: v.created_by,
        created_at: v.created_at,
      };
    });
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await UserEntityModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return await UserEntityModel.findById(id);
  }

  async create(user: Partial<User>): Promise<void> {
    const userEntity: Partial<UserEntity> = {
      ...user,
    };
    await UserEntityModel.create(userEntity);
  }
  async update(user: Partial<User>): Promise<void> {
    const { id, ...userUpdated } = user;
    const userEntityUpdated: Partial<UserEntity> = {
      ...userUpdated,
    };
    await UserEntityModel.updateOne({ id }, userEntityUpdated);
  }
  async delete(id: string): Promise<void> {
    await UserEntityModel.deleteOne({ id });
  }
}

export default UserRepository;
