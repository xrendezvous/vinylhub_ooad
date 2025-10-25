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

    async updateProfile(userId, updates) {
        const user = await this.userRepo.findById(userId);
        if (!user) return null;

        const allowed = ["username", "email", "passwordHash", "role"];
        const validUpdates = Object.keys(updates)
            .filter(k => allowed.includes(k))
            .reduce((acc, k) => ({ ...acc, [k]: updates[k] }), {});

        return await user.update(validUpdates);
    }
}
