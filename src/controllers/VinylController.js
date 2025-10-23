import { VinylService } from "../services/VinylService.js";

const vinylService = new VinylService();

export class VinylController {
    async getAll(req, res) {
        const vinyls = await vinylService.getAll();
        res.json(vinyls);
    }

    async getById(req, res) {
        const vinyl = await vinylService.getById(req.params.id);
        if (!vinyl) return res.status(404).json({ message: "Not found" });
        res.json(vinyl);
    }

    async create(req, res) {
        const newVinyl = await vinylService.create(req.body);
        res.status(201).json(newVinyl);
    }

    async update(req, res) {
        const updated = await vinylService.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.json(updated);
    }

    async delete(req, res) {
        const deleted = await vinylService.delete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted successfully" });
    }
}

