import { WishlistItem } from "../models/WishlistItem.js";

export class WishlistRepository {
    async save(data) {
        return await WishlistItem.create(data);
    }

    async findByVinyl(vinylId) {
        return await WishlistItem.findAll({ where: { vinylId } });
    }

    async findByUser(userId) {
        return await WishlistItem.findAll({ where: { userId } });
    }
}
