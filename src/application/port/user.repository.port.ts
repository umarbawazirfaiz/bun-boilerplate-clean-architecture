import type { User } from "../../domain/user";

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(user: Partial<User>): Promise<void>;
  update(user: Partial<User>): Promise<void>;
  delete(id: string): Promise<void>;
}
