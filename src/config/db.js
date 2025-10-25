import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const isTest = process.env.NODE_ENV === "test";

export const sequelize = isTest
    ? new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || 5432,
            dialect: "postgres",
            logging: false,
        }
    );

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        if (isTest) {
            await sequelize.sync({ force: true });
            console.log("SQLite in-memory tables created for testing.");
        }
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}
