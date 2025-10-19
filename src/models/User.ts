import { Role } from "./enums/Role";

export interface User {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    role: Role;
    createdAt: Date;
}
