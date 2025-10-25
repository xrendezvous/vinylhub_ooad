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
            if (!items || items.length === 0)
                return res.status(404).json({ message: "Collection not found" });
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
            if (err.message === "Collection item not found")
                return res.status(404).json({ message: err.message });
            res.status(400).json({ error: err.message });
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            await collectionService.deleteItem(id);
            res.json({ message: "Item deleted successfully" });
        } catch (err) {
            if (err.message === "Collection item not found")
                return res.status(404).json({ message: err.message });
            res.status(400).json({ error: err.message });
        }
    }
}
