import { ProfileService } from "../services/ProfileService.js";
import { UserRepository } from "../repos/UserRepository.js";
import { ListingRepository } from "../repos/ListingRepository.js";

const profileService = new ProfileService(new UserRepository(), new ListingRepository());

export class ProfileController {
    async getProfile(req, res) {
        try {
            const { userId } = req.params;
            const user = await profileService.getProfile(userId);
            if (!user) return res.status(404).json({ error: "User not found" });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getUserListings(req, res) {
        try {
            const { userId } = req.params;
            const listings = await profileService.getUserListings(userId);
            res.json(listings);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
