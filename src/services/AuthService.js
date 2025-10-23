import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repos/UserRepository.js";

const repo = new UserRepository();

export class AuthService {
    async register(username, email, password) {
        const hash = await bcrypt.hash(password, 10);
        const user = await repo.create({ username, email, passwordHash: hash });
        return user;
    }

    async login(email, password) {
        const user = await repo.findByEmail(email);
        if (!user) throw new Error("User not found");
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) throw new Error("Invalid credentials");

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return { token, user };
    }
}

module.exports = { AuthService };