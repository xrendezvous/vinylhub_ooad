import { IWishlistRepository } from "../IWishlistRepository";
import { WishlistItem } from "../../models/WishlistItem";

export class WishlistRepository implements IWishlistRepository {
    private items: WishlistItem[] = [];

    async save(w: WishlistItem): Promise<WishlistItem> {
        this.items.push(w);
        return w;
    }

    async findByVinyl(vinylId: string): Promise<WishlistItem[]> {
        return this.items.filter(i => i.vinylId === vinylId);
    }

    async findByUser(userId: string): Promise<WishlistItem[]> {
        return this.items.filter(i => i.userId === userId);
    }
}
