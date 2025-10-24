import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export class AuthService {
    async register(username, email, password, role = "COLLECTOR") {
        const existing = await User.findOne({ where: { email } });
        if (existing) throw new Error("User already exists");

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            passwordHash,
            role,
        });

        return user;
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) throw new Error("Invalid password");

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { token, user };
    }

    verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}
