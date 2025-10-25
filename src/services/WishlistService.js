export class WishlistService {
    constructor(repo, userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
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
        const uniqueUsers = new Map();
        for (const w of wishes) {
            if (!uniqueUsers.has(w.userId)) {
                const user = await this.userRepo.findById(w.userId);
                if (user) uniqueUsers.set(w.userId, user);
            }
        }
        return Array.from(uniqueUsers.values());
    }

    async update(id, data) {
        const wishlist = await this.repo.findById(id);
        if (!wishlist) throw new Error("Wishlist not found");
        Object.assign(wishlist, data);
        await wishlist.save();
        return wishlist;
    }

    async delete(id) {
        const wishlist = await this.repo.findById(id);
        if (!wishlist) return null;
        await wishlist.destroy();
        return wishlist;
    }
}
