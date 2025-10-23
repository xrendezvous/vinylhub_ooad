import { Listing } from "../models/Listing.js";

export class ListingRepository {
    constructor() {
        this.listings = [];
    }

    async existsConflict(vinylId, sellerId) {
        return this.listings.some(l => l.vinylId === vinylId && l.sellerId === sellerId);
    }

    async save(listingData) {
        // якщо передали не об’єкт класу Listing — створимо його
        const listing = listingData instanceof Listing ? listingData : new Listing(
            listingData.id,
            listingData.sellerId,
            listingData.vinylId,
            listingData.price,
            listingData.currency,
            listingData.status,
            listingData.createdAt
        );

        this.listings.push(listing);
        return listing;
    }

    async find(id) {
        return this.listings.find(l => l.id === id) || null;
    }

    async findByUser(userId) {
        return this.listings.filter(l => l.sellerId === userId);
    }
}
