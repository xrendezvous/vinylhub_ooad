import { WishlistService } from "../services/WishlistService.js";
import { WishlistRepository } from "../repos/WishlistRepository.js";

const wishlistService = new WishlistService(new WishlistRepository());

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
            res.json(items);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
