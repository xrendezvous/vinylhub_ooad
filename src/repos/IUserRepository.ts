import { User } from "../models/User";

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    save(user: User): Promise<User>;
}
