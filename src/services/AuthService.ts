import { IUserRepository } from "../repos/IUserRepository";
import { User } from "../models/User";
import { Role } from "../models/enums/Role";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export class AuthService {
    constructor(private repo: IUserRepository) {}

    async register(username: string, email: string, password: string): Promise<User> {
        const user: User = {
            id: randomUUID(),
            username,
            email,
            passwordHash: Buffer.from(password).toString("base64"),
            role: Role.USER,
            createdAt: new Date()
        };
        return await this.repo.save(user);
    }

    async login(username: string, password: string): Promise<string> {
        const users = (await this.repo as any).users;
        const found = users.find((u: User) => u.username === username);
        if (!found || found.passwordHash !== Buffer.from(password).toString("base64")) {
            throw new Error("Invalid credentials");
        }
        return jwt.sign({ id: found.id, role: found.role }, "SECRET", { expiresIn: "1h" });
    }
}
