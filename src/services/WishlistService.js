import { WishlistItem } from "../models/WishlistItem.js";

export class WishlistService {
    constructor(repo) {
        this.repo = repo;
    }

    async addWishlist(userId, vinylId, queryText) {
        return await this.repo.save({
            userId,
            vinylId: vinylId || null,
            queryText: queryText || null,
            createdAt: new Date()
        });
    }

    async findMatchesForListing(listing) {
        const wishes = await this.repo.findByVinyl(listing.vinylId);
        return wishes.map(w => ({ id: w.userId }));
    }
}
