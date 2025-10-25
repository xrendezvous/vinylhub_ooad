import request from "supertest";
import jwt from "jsonwebtoken";
import {describe, test, expect} from "vitest";
import { app } from "../src/app.js";

const token = jwt.sign({ id: 2, role: "COLLECTOR" }, process.env.JWT_SECRET);
let wishlistId;

describe("WISHLIST CRUD", () => {
    test("додавання", async () => {
        const res = await request(app)
            .post("/api/wishlist")
            .set("Authorization", `Bearer ${token}`)
            .send({ userId: "2", vinylId: "1", queryText: "Beatles" });
        expect(res.statusCode).toBe(201);
        wishlistId = res.body.id;
    });

    test("отримання", async () => {
        const res = await request(app)
            .get(`/api/wishlist/2`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("додавання без параметрів має дати помилку", async () => {
        const res = await request(app)
            .post("/api/wishlist")
            .set("Authorization", `Bearer ${token}`)
            .send({});
        expect(res.statusCode).toBe(400);
    });

    test("отримання неіснуючого користувача → 404", async () => {
        const res = await request(app)
            .get("/api/wishlist/9999")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });
});
