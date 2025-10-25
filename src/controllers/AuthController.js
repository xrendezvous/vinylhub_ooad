import { AuthService } from "../services/AuthService.js";

const authService = new AuthService();

export class AuthController {
    async register(req, res) {
        try {
            const { username, email, password, role } = req.body;
            const user = await authService.register(username, email, password, role);
            res.status(201).json(user);
        } catch (err) {
            console.error("Register error:", err);
            res.status(400).json({ error: err.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Email and password required" });
            }

            const { token, user } = await authService.login(email, password);
            res.json({ token, user });
        } catch (err) {
            console.error("Login error:", err.message);
            res.status(400).json({ error: err.message });
        }
    }

    async logout(req, res) {
        try {
            res.status(200).json({ message: "Logged out successfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

}
