import { sequelize } from "../src/config/db.js";
import { initModels } from "../src/models/index.js";
import { seedDatabase } from "../src/config/seed.js";

beforeAll(async () => {
    console.log("Initializing models...");
    initModels();

    console.log("Syncing database for tests...");
    await sequelize.sync({ force: true });

    console.log("Seeding base test data...");
    await seedDatabase();

    console.log("Base test data created successfully!");
});

afterAll(async () => {
    await sequelize.close();
    console.log("Database connection closed.");
});