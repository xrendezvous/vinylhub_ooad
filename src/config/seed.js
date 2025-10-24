import { User } from "../models/User.js";
import { Vinyl } from "../models/Vinyl.js";
import { Listing } from "../models/Listing.js";
import { WishlistItem } from "../models/WishlistItem.js";
import { sequelize } from "./db.js";
import { Role } from "../models/enums/Role.js";

export const seedDatabase = async () => {
    await sequelize.sync({ force: false });

    const usersCount = await User.count();
    if (usersCount > 0) {
        console.log("Seed skipped — data already exists");
        return;
    }

    console.log("Seeding initial data...");

    const user1 = await User.create({
        username: "arina",
        email: "arina@example.com",
        passwordHash: "123456",
        role: Role.COLLECTOR
    });

    const user2 = await User.create({
        username: "oleksandr",
        email: "oleksandr@example.com",
        passwordHash: "abcdef",
        role: Role.SELLER
    });

    const vinyl1 = await Vinyl.create({
        title: "Pink Floyd - The Wall",
        artist: "Pink Floyd",
        year: 1979,
        label: "Harvest Records",
        genres: ["Progressive Rock"]
    });

    const vinyl2 = await Vinyl.create({
        title: "The Beatles - Abbey Road",
        artist: "The Beatles",
        year: 1969,
        label: "Apple Records",
        genres: ["Rock", "Classic"]
    });

    await Listing.create({
        sellerId: user2.id,
        vinylId: vinyl1.id,
        price: 800,
        currency: "UAH",
        status: "ACTIVE"
    });

    await WishlistItem.create({
        userId: user1.id,
        vinylId: vinyl1.id,
        queryText: "Pink Floyd"
    });

    console.log("Database seeded successfully!");
};
