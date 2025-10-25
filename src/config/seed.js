import { User } from "../models/User.js";
import { Vinyl } from "../models/Vinyl.js";
import { Listing } from "../models/Listing.js";
import { WishlistItem } from "../models/WishlistItem.js";
import { sequelize } from "./db.js";
import { Role } from "../models/enums/Role.js";
import { Payment } from "../models/Payment.js";
import { PaymentStatus } from "../models/enums/PaymentStatus.js";
import bcrypt from "bcrypt";

export const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    console.log("Seeding base test data...");

    const hash1 = await bcrypt.hash("123456", 10);
    const hash2 = await bcrypt.hash("abcdef", 10);

    const user1 = await User.create({
        username: "arina",
        email: "arina@example.com",
        passwordHash: hash1,
        role: Role.COLLECTOR
    });

    const user2 = await User.create({
        username: "oleksandr",
        email: "oleksandr@example.com",
        passwordHash: hash2,
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

    const listing = await Listing.create({
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

    const payment = await Payment.create({
        buyerId: user1.id,
        listingId: listing.id,
        amount: 800,
        currency: "UAH",
        status: PaymentStatus.COMPLETED,
        transactionId: "TX12345"
    });

    global.testData = {
        seller: user2,
        collector: user1,
        vinyl: vinyl1,
        listing,
        payment
    };

    console.log("Base test data created successfully!");
};
