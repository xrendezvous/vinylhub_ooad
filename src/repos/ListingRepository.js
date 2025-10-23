import { Listing } from "../models/Listing.js";

export class ListingRepository {
    constructor() {
        this.listings = [];
    }

    async existsConflict(vinylId, sellerId) {
        return this.listings.some(l => l.vinylId === vinylId && l.sellerId === sellerId);
    }

    async findAll() { return Listing.findAll(); }
    async findById(id) { return Listing.findByPk(id); }

    async findByUser(userId) {
        return this.listings.filter(l => l.sellerId === userId);
    }

    async create(data) { return Listing.create(data); }
    async update(id, data) {
        const listing = await Listing.findByPk(id);
        if (!listing) return null;
        return listing.update(data);
    }

    async delete(id) {
        const listing = await Listing.findByPk(id);
        if (!listing) return null;
        await listing.destroy();
        return listing;
    }

}
