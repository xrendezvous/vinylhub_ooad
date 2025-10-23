import { ListingService } from "../services/ListingService.js";
import { ListingRepository } from "../repos/impl/ListingRepository.js";
import { WishlistService } from "../services/WishlistService.js";
import { WishlistRepository } from "../repos/impl/WishlistRepository.js";
import { EmailProvider } from "../adapters/EmailProvider.js";

const wishlistService = new WishlistService(new WishlistRepository());
const listingService = new ListingService(new ListingRepository(), new EmailProvider(), wishlistService);

export class ListingController {
    async createListing(req, res) {
        try {
            const { userId, vinylId, price, photos } = req.body;
            const listing = await listingService.createListing(userId, vinylId, price, photos);
            res.status(201).json(listing);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
