import { CollectionService } from "../services/CollectionService.js";
import { CollectionRepository } from "../repos/CollectionRepository.js";

const collectionService = new CollectionService(new CollectionRepository());

export class CollectionController {
    async addItem(req, res) {
        try {
            const { userId, vinylId, condition, notes, photos } = req.body;
            const item = await collectionService.addItem(userId, vinylId, condition, notes, photos);
            res.status(201).json(item);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getUserCollection(req, res) {
        try {
            const { userId } = req.params;
            const items = await collectionService.getUserCollection(userId);
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateItem(req, res) {
        try {
            const { id } = req.params;
            const updated = await collectionService.updateItem(id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            await collectionService.deleteItem(id);
            res.json({ message: "Item deleted successfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
