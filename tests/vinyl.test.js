import request from "supertest";
import {describe, test, expect} from "vitest";
import jwt from "jsonwebtoken";
import { app } from "../src/app.js";

const token = jwt.sign({ id: 1, role: "SELLER" }, process.env.JWT_SECRET);
let vinylId;

describe("VINYLS CRUD", () => {
    test("створення", async () => {
        const res = await request(app)
            .post("/api/vinyls")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Abbey Road",
                artist: "The Beatles",
                year: 1969,
                label: "Apple Records"
            });
        expect(res.statusCode).toBe(201);
        vinylId = res.body.id;
    });

    test("отримання", async () => {
        const res = await request(app)
            .get(`/api/vinyls/${vinylId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("оновлення", async () => {
        const res = await request(app)
            .put(`/api/vinyls/${vinylId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ label: "EMI" });
        expect(res.statusCode).toBe(200);
    });

    test("видалення", async () => {
        const res = await request(app)
            .delete(`/api/vinyls/${vinylId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("отримання всіх вінілів", async () => {
        const res = await request(app)
            .get("/api/vinyls")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });

    test("запит неіснуючого вінілу повертає 404", async () => {
        const res = await request(app)
            .get("/api/vinyls/9999")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });
});
