import { WishlistItem } from "../models/WishlistItem";

export interface IWishlistRepository {
    save(w: WishlistItem): Promise<WishlistItem>;
    findByVinyl(vinylId: string): Promise<WishlistItem[]>;
    findByUser(userId: string): Promise<WishlistItem[]>;
}
