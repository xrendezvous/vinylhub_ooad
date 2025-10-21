import { WishlistItem } from "../models/WishlistItem.js";
import { randomUUID } from "crypto";

export class WishlistService {
    constructor(repo) {
        this.repo = repo;
    }

    async addWishlist(userId, vinylId, queryText) {
        const item = new WishlistItem(
            randomUUID(),
            userId,
            vinylId || "",
            queryText || "",
            new Date()
        );
        return await this.repo.save(item);
    }

    async findMatchesForListing(listing) {
        const wishes = await this.repo.findByVinyl(listing.vinylId);
        return wishes.map(w => ({ id: w.userId }));
    }
}
