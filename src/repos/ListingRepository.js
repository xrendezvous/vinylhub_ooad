import { Listing } from "../models/Listing.js";

export class ListingRepository {
    async existsConflict(vinylId, sellerId) {
        const count = await Listing.count({ where: { vinylId, sellerId } });
        return count > 0;
    }

    async findAll() {
        return await Listing.findAll();
    }

    async findById(id) {
        return await Listing.findByPk(id);
    }

    async findByUser(userId) {
        return await Listing.findAll({ where: { sellerId: userId } });
    }

    async create(data) {
        return await Listing.create(data);
    }

    async update(id, data) {
        const listing = await Listing.findByPk(id);
        if (!listing) return null;
        return await listing.update(data);
    }

    async delete(id) {
        const listing = await Listing.findByPk(id);
        if (!listing) return null;
        await listing.destroy();
        return listing;
    }
}
