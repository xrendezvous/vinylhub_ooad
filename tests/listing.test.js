import request from "supertest";
import { describe, test, expect, beforeAll } from "vitest";
import jwt from "jsonwebtoken";
import { app } from "../src/app.js";

let token;
let listingId;

beforeAll(() => {
    token = jwt.sign(
        { id: global.testData.seller.id, role: "SELLER" },
        process.env.JWT_SECRET
    );
});

describe("LISTINGS CRUD", () => {
    test("створення", async () => {
        const res = await request(app)
            .post("/api/listings")
            .set("Authorization", `Bearer ${token}`)
            .send({
                userId: global.testData.seller.id,
                vinylId: global.testData.vinyl.id,
                price: 1500,
                photos: ["cover.jpg"]
            });
        expect(res.statusCode).toBe(201);
        listingId = res.body.id;
    });

    test("отримання", async () => {
        const resGet = await request(app)
            .get(`/api/listings/${listingId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(resGet.statusCode).toBe(200);
    });

    test("отримання всіх оголошень", async () => {
        const res = await request(app)
            .get("/api/listings")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("створення без vinylId має повернути 400", async () => {
        const res = await request(app)
            .post("/api/listings")
            .set("Authorization", `Bearer ${token}`)
            .send({ userId: global.testData.seller.id, price: 1500 });
        expect(res.statusCode).toBe(400);
    });

    test("оновлення оголошення", async () => {
        const res = await request(app)
            .put(`/api/listings/${listingId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ price: 2000 });
        expect(res.statusCode).toBe(200);
    });

    test("видалення оголошення", async () => {
        const res = await request(app)
            .delete(`/api/listings/${listingId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("створення без ціни має дати помилку", async () => {
        const res = await request(app)
            .post("/api/listings")
            .set("Authorization", `Bearer ${token}`)
            .send({
                userId: global.testData.seller.id,
                vinylId: global.testData.vinyl.id
            });
        expect(res.statusCode).toBe(400);
    });
});
