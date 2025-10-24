export class ProfileService {
    constructor(userRepo, listingRepo) {
        this.userRepo = userRepo;
        this.listingRepo = listingRepo;
    }

    async getProfile(userId) {
        return await this.userRepo.findById(userId);
    }

    async getUserListings(userId) {
        return await this.listingRepo.findByUser(userId);
    }
}
