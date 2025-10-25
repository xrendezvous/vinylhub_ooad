import {describe, test, expect, vi} from "vitest";
import jwt from "jsonwebtoken";
import { authMiddleware, sellerOnly } from "../src/middleware/authMiddleware.js";

describe("Middleware", () => {
    test("authMiddleware повинен пропускати з валідним токеном", () => {
        const token = jwt.sign({ id: 1, role: "SELLER" }, process.env.JWT_SECRET);
        const req = { headers: { authorization: `Bearer ${token}` } };
        const res = {};
        const next = vi.fn();
        authMiddleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    test("sellerOnly блокує не продавця", () => {
        const req = { user: { role: "COLLECTOR" } };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        const next = vi.fn();
        sellerOnly(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("authMiddleware без токена має дати 401", () => {
        const req = { headers: {} };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        const next = vi.fn();

        authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    test("authMiddleware з невалідним токеном має дати 403", () => {
        const req = { headers: { authorization: "Bearer invalid.token" } };
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
        const next = vi.fn();

        authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
    });

});
