import { User } from "../models/User.js";

export class UserRepository {
    async findById(id) { return User.findByPk(id); }
    async findByEmail(email) { return User.findOne({ where: { email } }); }
    async create(userData) { return User.create(userData); }
}

