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

    async findById(id) {
        return await WishlistItem.findByPk(id);
    }

    async update(id, data) {
        const item = await WishlistItem.findByPk(id);
        if (!item) return null;
        return await item.update(data);
    }

    async delete(id) {
        const item = await WishlistItem.findByPk(id);
        if (!item) return null;
        await item.destroy();
        return item;
    }
}
