import { IUserRepository } from "../IUserRepository";
import { User } from "../../models/User";

export class UserRepository implements IUserRepository {
    private users: User[] = [];

    async findById(id: string): Promise<User | null> {
        return this.users.find(u => u.id === id) || null;
    }

    async save(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }
}
