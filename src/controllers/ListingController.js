import { ListingService } from "../services/ListingService.js";
import { ListingRepository } from "../repos/ListingRepository.js";
import { WishlistService } from "../services/WishlistService.js";
import { WishlistRepository } from "../repos/WishlistRepository.js";
import { EmailProvider } from "../adapters/EmailProvider.js";
import { UserRepository } from "../repos/UserRepository.js";
import { VinylRepository } from "../repos/VinylRepository.js";

const wishlistService = new WishlistService(
    new WishlistRepository(),
    new UserRepository()
);
const listingService = new ListingService(
    new ListingRepository(),
    new EmailProvider(),
    wishlistService,
    new UserRepository(),
    new VinylRepository()
);

export class ListingController {
    async createListing(req, res) {
        try {
            const { vinylId, price, photos } = req.body;
            const userId = req.user?.id || req.body.userId;
            const listing = await listingService.createListing(userId, vinylId, price, photos);
            res.status(201).json(listing);
        } catch (err) {
            console.error("Error creating listing:", err);
            res.status(400).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        const listings = await listingService.getAll();
        res.json(listings);
    }

    async getById(req, res) {
        const listing = await listingService.getById(req.params.id);
        if (!listing) return res.status(404).json({ error: "Listing not found" });
        res.json(listing);
    }

    async update(req, res) {
        const updated = await listingService.updateListing(req.params.id, req.body);
        res.json(updated);
    }

    async delete(req, res) {
        await listingService.deleteListing(req.params.id);
        res.json({ message: "Listing deleted" });
    }
}
