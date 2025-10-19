import { IListingRepository } from "../repos/IListingRepository";
import { INotificationService } from "../adapters/inter/INotificationService";
import { IWishlistService } from "./IWishlistService";
import { Listing } from "../models/Listing";
import { ListingStatus } from "../models/enums/ListingStatus";
import { randomUUID } from "crypto";

export class ListingService {
    constructor(
        private repo: IListingRepository,
        private notif: INotificationService,
        private wishlistService: IWishlistService
    ) {}

    async createListing(userId: string, vinylId: string, price: number, photos: string[]): Promise<Listing> {
        const conflict = await this.repo.existsConflict(vinylId, userId);
        if (conflict) throw new Error("Listing already exists for this vinyl and user.");

        const listing: Listing = {
            id: randomUUID(),
            sellerId: userId,
            vinylId,
            price,
            currency: "USD",
            status: ListingStatus.ACTIVE,
            createdAt: new Date()
        };

        await this.repo.save(listing);

        const matchedUsers = await this.wishlistService.findMatchesForListing(listing);
        await this.notif.notifyUsers(matchedUsers.map(u => u.id), "A listing matches your wishlist!");
        return listing;
    }
}
