import { IListingRepository } from "/repos/IListingRepository";
import { Listing } from "../../models/Listing";

export class ListingRepository implements IListingRepository {
    private listings: Listing[] = [];

    async existsConflict(vinylId: string, sellerId: string): Promise<boolean> {
        return this.listings.some(l => l.vinylId === vinylId && l.sellerId === sellerId);
    }

    async save(listing: Listing): Promise<Listing> {
        this.listings.push(listing);
        return listing;
    }

    async find(id: string): Promise<Listing | null> {
        return this.listings.find(l => l.id === id) || null;
    }

    async findByUser(userId: string): Promise<Listing[]> {
        return this.listings.filter(l => l.sellerId === userId);
    }
}
