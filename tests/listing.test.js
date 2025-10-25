import request from "supertest";
import { describe, test, expect, beforeAll } from "vitest";
import jwt from "jsonwebtoken";
import { app } from "../src/app.js";
import { ListingStatus } from "../src/models/enums/ListingStatus.js";

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

    test("оновлення статусу на SOLD", async () => {
        const res = await request(app)
            .put(`/api/listings/${listingId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ status: ListingStatus.SOLD });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(ListingStatus.SOLD);
    });

    test("оновлення статусу на CANCELLED", async () => {
        const res = await request(app)
            .put(`/api/listings/${listingId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ status: ListingStatus.CANCELLED });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(ListingStatus.CANCELLED);
    });

    test("оновлення з невалідним статусом має дати 400", async () => {
        const res = await request(app)
            .put(`/api/listings/${listingId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ status: "INVALID_STATUS" });
        expect(res.statusCode).toBe(400);
    });

    test("видалення оголошення", async () => {
        const res = await request(app)
            .delete(`/api/listings/${listingId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

});
