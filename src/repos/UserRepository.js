import { User } from "../models/User.js";

export class UserRepository {
    constructor() {
        this.users = [];
    }

    async findById(id) {
        return this.users.find(u => u.id === id) || null;
    }

    async save(userData) {
        const user = userData instanceof User ? userData : new User(
            userData.id,
            userData.username,
            userData.email,
            userData.passwordHash,
            userData.role,
            userData.createdAt
        );

        this.users.push(user);
        return user;
    }
}
