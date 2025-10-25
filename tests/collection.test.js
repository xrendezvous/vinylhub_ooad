import request from "supertest";
import { describe, test, expect} from "vitest";
import jwt from "jsonwebtoken";
import { app } from "../src/app.js";

const token = jwt.sign({ id: 2, role: "COLLECTOR" }, process.env.JWT_SECRET);
let itemId;

describe("COLLECTION CRUD", () => {
    test("додавання", async () => {
        const res = await request(app)
            .post("/api/collection")
            .set("Authorization", `Bearer ${token}`)
            .send({
                userId: "2",
                vinylId: "1",
                condition: "Good",
                notes: "Test note"
            });
        expect(res.statusCode).toBe(201);
        itemId = res.body.id;
    });

    test("оновлення", async () => {
        const res = await request(app)
            .put(`/api/collection/${itemId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ condition: "Excellent" });
        expect(res.statusCode).toBe(200);
    });

    test("отримання колекції користувача", async () => {
        const res = await request(app)
            .get("/api/collection/2")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("видалення елемента з колекції", async () => {
        const res = await request(app)
            .delete(`/api/collection/${itemId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("створення без vinylId має дати помилку", async () => {
        const res = await request(app)
            .post("/api/collection")
            .set("Authorization", `Bearer ${token}`)
            .send({ userId: "2", condition: "Good" });
        expect(res.statusCode).toBe(400);
    });

});
