import { Role } from "./enums/Role.js";

export class User {
    constructor(id, username, email, passwordHash, role = Role.USER, createdAt = new Date()) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        this.createdAt = createdAt;
    }
}
