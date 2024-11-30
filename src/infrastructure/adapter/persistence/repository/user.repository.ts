import type { UserRepositoryPort } from "../../../../application/port/user.repository.port";
import type { User } from "../../../../domain/user";

class UserRepository implements UserRepositoryPort {
    findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    create(user: Partial<User>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(user: Partial<User>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default UserRepository;