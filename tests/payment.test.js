import request from "supertest";
import { describe, test, expect, beforeAll } from "vitest";
import jwt from "jsonwebtoken";
import { app } from "../src/app.js";

let token;

beforeAll(() => {
    token = jwt.sign(
        { id: global.testData.seller.id, role: "SELLER" },
        process.env.JWT_SECRET
    );
});

describe("PAYMENTS", () => {
    test("створення платежу", async () => {
        const res = await request(app)
            .post("/api/order/pay")
            .set("Authorization", `Bearer ${token}`)
            .send({
                buyerId: global.testData.collector.id,
                listingId: global.testData.listing.id
            });
        expect(res.statusCode).toBe(200);
    });

    test("повернення", async () => {
        const res = await request(app)
            .post(`/api/order/refund/${global.testData.payment.id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("створення з невалідним listingId", async () => {
        const res = await request(app)
            .post("/api/order/pay")
            .set("Authorization", `Bearer ${token}`)
            .send({
                buyerId: global.testData.collector.id,
                listingId: 9999
            });
        expect(res.statusCode).toBe(400);
    });

    test("refund блокується для звичайного користувача", async () => {
        const userToken = jwt.sign(
            { id: global.testData.collector.id, role: "COLLECTOR" },
            process.env.JWT_SECRET
        );

        const res = await request(app)
            .post(`/api/order/refund/${global.testData.payment.id}`)
            .set("Authorization", `Bearer ${userToken}`);
        expect(res.statusCode).toBe(403);
    });
});
