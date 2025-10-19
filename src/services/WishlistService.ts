import { IWishlistRepository } from "../repos/IWishlistRepository";
import { WishlistItem } from "../models/WishlistItem";
import { Listing } from "../models/Listing";
import { User } from "../models/User";
import { randomUUID } from "crypto";

export class WishlistService {
    constructor(private repo: IWishlistRepository) {}

    async addWishlist(userId: string, vinylId?: string, queryText?: string): Promise<WishlistItem> {
        const item: WishlistItem = {
            id: randomUUID(),
            userId,
            vinylId: vinylId || "",
            queryText: queryText || "",
            createdAt: new Date()
        };
        return await this.repo.save(item);
    }

    async findMatchesForListing(listing: Listing): Promise<User[]> {
        const wishes = await this.repo.findByVinyl(listing.vinylId);
        return wishes.map(w => ({ id: w.userId } as User));
    }
}
