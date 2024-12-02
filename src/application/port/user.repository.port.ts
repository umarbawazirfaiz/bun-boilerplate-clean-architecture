import type { User } from "../../domain/user";

export interface UserRepositoryPort {
  findAll(
    pageNumber: number,
    limitNumber: number,
    sortBy: string,
    sortType: string
  ): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  getTotalData(): Promise<number>;
}
