import { Listing } from "../models/Listing";

export interface IListingRepository {
    existsConflict(vinylId: string, sellerId: string): Promise<boolean>;
    save(listing: Listing): Promise<Listing>;
    find(id: string): Promise<Listing | null>;
    findByUser(userId: string): Promise<Listing[]>;
}
