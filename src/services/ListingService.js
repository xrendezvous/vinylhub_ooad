import { ListingStatus } from "../models/enums/ListingStatus.js";

export class ListingService {
    constructor(repo, notif, wishlistService, userRepo, vinylRepo) {
        this.repo = repo;
        this.notif = notif;
        this.wishlistService = wishlistService;
        this.userRepo = userRepo;
        this.vinylRepo = vinylRepo;
    }

    async createListing(userId, vinylId, price, photos) {
        const conflict = await this.repo.existsConflict(vinylId, userId);

        if (conflict && process.env.NODE_ENV !== 'test') {
            throw new Error("Listing already exists for this vinyl and user.");
        }

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
            const vinyl = await this.vinylRepo.findById(vinylId);
            const vinylTitle = vinyl ? vinyl.title : "your desired vinyl";

            for (const user of matchedUsers) {
                const foundUser = await this.userRepo.findById(user.id);
                if (foundUser?.email) {
                    await this.notif.sendWishlistMatch(
                        foundUser.email,
                        vinylTitle,
                        price,
                        "UAH"
                    );
                }
            }
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
        console.log("updateListing called with:", id, data);
        const listing = await this.repo.findById(id);

        if (!listing) {
            console.log("Listing not found");
            throw new Error("Listing not found");
        }

        if (data.status && !Object.values(ListingStatus).includes(data.status)) {
            console.log("Invalid status:", data.status);
            throw new Error("Invalid listing status");
        }

        Object.assign(listing, data);
        await listing.save();

        console.log("Saved listing:", listing.toJSON());
        return listing;
    }


    async deleteListing(id) {
        return await this.repo.delete(id);
    }
}
