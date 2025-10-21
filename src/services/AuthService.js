import { User } from "../models/User.js";
import { Role } from "../models/enums/Role.js";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export class AuthService {
    constructor(repo) {
        this.repo = repo;
    }

    async register(username, email, password) {
        const user = new User(
            randomUUID(),
            username,
            email,
            Buffer.from(password).toString("base64"),
            Role.USER,
            new Date()
        );
        return await this.repo.save(user);
    }

    async login(username, password) {
        const users = this.repo.users; // Type casting TS видалено
        const found = users.find(u => u.username === username);
        if (!found || found.passwordHash !== Buffer.from(password).toString("base64")) {
            throw new Error("Invalid credentials");
        }
        return jwt.sign({ id: found.id, role: found.role }, "SECRET", { expiresIn: "1h" });
    }
}

module.exports = { AuthService };