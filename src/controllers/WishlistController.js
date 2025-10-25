import { WishlistService } from "../services/WishlistService.js";
import { WishlistRepository } from "../repos/WishlistRepository.js";
import { UserRepository } from "../repos/UserRepository.js";

const wishlistService = new WishlistService(new WishlistRepository(), new UserRepository());

export class WishlistController {
    async addWishlist(req, res) {
        try {
            const { userId, vinylId, queryText } = req.body;
            const item = await wishlistService.addWishlist(userId, vinylId, queryText);
            res.status(201).json(item);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getUserWishlist(req, res) {
        try {
            const { userId } = req.params;
            const items = await wishlistService.repo.findByUser(userId);
            if (!items || items.length === 0)
                return res.status(404).json({ error: "Wishlist not found" });
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updated = await wishlistService.update(id, req.body);
            if (!updated)
                return res.status(404).json({ message: "Wishlist not found" });
            res.json(updated);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async delete(req, res) {
        try {
            const deleted = await wishlistService.delete(req.params.id);
            if (!deleted)
                return res.status(404).json({ message: "Wishlist not found" });
            res.json({ message: "Wishlist deleted" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
