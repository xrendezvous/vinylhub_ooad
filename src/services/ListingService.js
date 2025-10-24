import { Listing } from "../models/Listing.js";
import { ListingStatus } from "../models/enums/ListingStatus.js";

export class ListingService {
    constructor(repo, notif, wishlistService) {
        this.repo = repo;
        this.notif = notif;
        this.wishlistService = wishlistService;
    }

    async createListing(userId, vinylId, price, photos) {
        const conflict = await this.repo.existsConflict(vinylId, userId);
        if (conflict) throw new Error("Listing already exists for this vinyl and user.");

        const listing = await this.repo.create({
            sellerId: userId,
            vinylId,
            price,
            currency: "UAH",
            status: ListingStatus.ACTIVE,
            photos,
        });

        const matchedUsers = await this.wishlistService.findMatchesForListing(listing);
        if (matchedUsers.length > 0) {
            await this.notif.notifyUsers(matchedUsers.map(u => u.id), "A listing matches your wishlist!");
        }

        return listing;
    }

    async getAll() {
        return await this.repo.findAll();
    }

    async getById(id) {
        return await this.repo.findById(id);
    }

    async updateListing(id, data) {
        return await this.repo.update(id, data);
    }

    async deleteListing(id) {
        return await this.repo.delete(id);
    }
}
