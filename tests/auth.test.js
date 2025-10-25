import { describe, test, expect} from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("AUTH", () => {
    const uniqueSuffix = Date.now();
    const user = {
        username: `arina_${uniqueSuffix}`,
        email: `arina_test_${uniqueSuffix}@example.com`,
        password: "password123",
        role: "SELLER",
    };

    test("реєстрація користувача", async () => {
        const res = await request(app).post("/api/auth/register").send(user);
        expect(res.statusCode).toBe(201);
        expect(res.body.email).toBe(user.email);
    });

    test("логін користувача", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: user.email, password: user.password });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    test("логін з неправильним паролем", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: user.email, password: "wrong" });

        expect(res.statusCode).toBe(400);
    });

    test("реєстрація без email має повертати 400", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({ username: "noEmail", password: "123456" });
        expect(res.statusCode).toBe(400);
    });

    test("логін неіснуючого користувача має повертати 400", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: "ghost@example.com", password: "123456" });
        expect(res.statusCode).toBe(400);
    });
});
