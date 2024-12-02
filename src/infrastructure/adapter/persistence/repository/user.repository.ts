import type { Model, SortOrder } from "mongoose";
import type { UserRepositoryPort } from "../../../../application/port/user.repository.port";
import type { User } from "../../../../domain/user";
import { type UserEntity } from "../entity/user.entity";

class UserRepository implements UserRepositoryPort {
  constructor(private readonly userEntityModel: Model<UserEntity>) {}

  async findAll(
    pageNumber: number,
    limitNumber: number,
    sortBy: string,
    sortType: string
  ): Promise<User[]> {
    const sortOrder: SortOrder = sortType.toLowerCase() === "asc" ? 1 : -1;

    const userEntities: UserEntity[] = await this.userEntityModel
      .find()
      .sort({ [sortBy]: sortOrder })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const users: User[] = userEntities.map((v) => {
      return {
        id: v._id,
        name: v.name,
        email: v.email,
        created_by: v.created_by,
        created_at: v.created_at,
      };
    });

    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userEntityModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return await this.userEntityModel.findById(id);
  }

  async create(user: User): Promise<void> {
    const userEntity: UserEntity = {
      ...user,
    };
    await this.userEntityModel.create(userEntity);
  }

  async update(user: User): Promise<void> {
    const { id, ...userUpdated } = user;
    const userEntityUpdated: UserEntity = {
      ...userUpdated,
    };
    await this.userEntityModel.updateOne({ id }, userEntityUpdated);
  }

  async delete(id: string): Promise<void> {
    await this.userEntityModel.deleteOne({ id });
  }

  async getTotalData(): Promise<number> {
    return await this.userEntityModel.countDocuments();
  }
}

export default UserRepository;
