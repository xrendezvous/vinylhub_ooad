import { WishlistItem } from "../models/WishlistItem.js";

export class WishlistRepository {
    constructor() {
        this.items = [];
    }

    async save(itemData) {
        const item = itemData instanceof WishlistItem ? itemData : new WishlistItem(
            itemData.id,
            itemData.userId,
            itemData.vinylId,
            itemData.queryText,
            itemData.createdAt
        );

        this.items.push(item);
        return item;
    }

    async findByVinyl(vinylId) {
        return this.items.filter(i => i.vinylId === vinylId);
    }

    async findByUser(userId) {
        return this.items.filter(i => i.userId === userId);
    }
}