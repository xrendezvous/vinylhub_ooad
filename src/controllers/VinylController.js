import { VinylService } from "../services/VinylService.js";
import { VinylRepository } from "../repos/impl/VinylRepository.js";

const vinylService = new VinylService(new VinylRepository());

export class VinylController {
    async getVinylById(req, res) {
        try {
            const { id } = req.params;
            const vinyl = await vinylService.getVinylById(id);
            if (!vinyl) return res.status(404).json({ error: "Vinyl not found" });
            res.json(vinyl);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async search(req, res) {
        try {
            const { q } = req.query;
            const results = await vinylService.searchVinyl(q || "");
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
