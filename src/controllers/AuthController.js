import { AuthService } from "../services/AuthService.js";
import { UserRepository } from "../repos/impl/UserRepository.js";

const authService = new AuthService(new UserRepository());

export class AuthController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const user = await authService.register(username, email, password);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await authService.login(username, password);
            res.json({ token });
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
}
