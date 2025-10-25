import request from "supertest";
import { describe, test, expect, beforeAll } from "vitest";
import jwt from "jsonwebtoken";
import { app } from "../src/app.js";
import { PaymentStatus } from "../src/models/enums/PaymentStatus.js";
import { ListingStatus } from "../src/models/enums/ListingStatus.js";

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

    test("створений платіж має статус PENDING", async () => {
        const res = await request(app)
            .post("/api/order/pay")
            .set("Authorization", `Bearer ${token}`)
            .send({
                buyerId: global.testData.collector.id,
                listingId: global.testData.listing.id
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(PaymentStatus.PENDING);
    });

    test("після повернення статус має бути REFUNDED", async () => {
        const res = await request(app)
            .post(`/api/order/refund/${global.testData.payment.id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.refunded).toBe(true);
    });

    test("успішна оплата змінює статус оголошення на SOLD", async () => {
        const resPay = await request(app)
            .post("/api/order/pay")
            .set("Authorization", `Bearer ${token}`)
            .send({
                buyerId: global.testData.collector.id,
                listingId: global.testData.listing.id
            });
        expect(resPay.statusCode).toBe(200);

        const resListing = await request(app)
            .get(`/api/listings/${global.testData.listing.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(resListing.body.status).toBe(ListingStatus.SOLD);
    });

});
