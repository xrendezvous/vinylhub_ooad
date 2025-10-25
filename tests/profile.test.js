import request from "supertest";
import { describe, test, expect, beforeAll} from "vitest";
import jwt from "jsonwebtoken";
import { app } from "../src/app.js";
import { User } from "../src/models/User.js";

let token, user;

beforeAll(async () => {
    user = await User.create({
        username: "collector",
        email: "collector@example.com",
        passwordHash: "123456",
        role: "COLLECTOR"
    });
    token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
});

describe("PROFILE", () => {
    test("отримання профілю", async () => {
        const res = await request(app)
            .get(`/api/profile/${user.id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("оновлення профілю", async () => {
        const res = await request(app)
            .put(`/api/profile/${user.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ username: "newCollector" });
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe("newCollector");
    });

    test("отримання списку оголошень користувача", async () => {
        const res = await request(app)
            .get(`/api/profile/${user.id}/listings`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("профіль неіснуючого користувача → 404", async () => {
        const res = await request(app)
            .get("/api/profile/9999")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });
});
