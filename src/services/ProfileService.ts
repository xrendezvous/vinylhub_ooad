import { IUserRepository } from "../repos/IUserRepository";
import { IListingRepository } from "../repos/IListingRepository";
import { User } from "../models/User";
import { Listing } from "../models/Listing";

export class ProfileService {
    constructor(private repo: IUserRepository, private listings: IListingRepository) {}

    async getProfile(userId: string): Promise<User | null> {
        return await this.repo.findById(userId);
    }

    async getUserListings(userId: string): Promise<Listing[]> {
        return await this.listings.findByUser(userId);
    }
}
