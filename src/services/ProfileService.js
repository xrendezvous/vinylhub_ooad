export class ProfileService {
    constructor(repo, listings) {
        this.repo = repo;
        this.listings = listings;
    }

    async getProfile(userId) {
        return await this.repo.findById(userId);
    }

    async getUserListings(userId) {
        return await this.listings.findByUser(userId);
    }
}
