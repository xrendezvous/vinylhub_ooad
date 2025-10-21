import { Listing } from "../models/Listing.js";
import { ListingStatus } from "../models/enums/ListingStatus.js";
import { randomUUID } from "crypto";

export class ListingService {
    constructor(repo, notif, wishlistService) {
        this.repo = repo;
        this.notif = notif;
        this.wishlistService = wishlistService;
    }

    async createListing(userId, vinylId, price, photos) {
        const conflict = await this.repo.existsConflict(vinylId, userId);
        if (conflict) throw new Error("Listing already exists for this vinyl and user.");

        const listing = new Listing(
            randomUUID(),
            userId,
            vinylId,
            price,
            "USD",
            ListingStatus.ACTIVE,
            new Date()
        );

        await this.repo.save(listing);

        const matchedUsers = await this.wishlistService.findMatchesForListing(listing);
        await this.notif.notifyUsers(matchedUsers.map(u => u.id), "A listing matches your wishlist!");
        return listing;
    }
}
