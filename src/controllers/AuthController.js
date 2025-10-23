import { AuthService } from "../services/AuthService.js";
const service = new AuthService();

export class AuthController {
    register = async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const user = await service.register(username, email, password);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const data = await service.login(email, password);
            res.json(data);
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }
}

