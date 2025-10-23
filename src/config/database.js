import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME || "vinylhub",
    process.env.DB_USER || "xrendezvous",
    process.env.DB_PASS || "Xzvv9843",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false,
    }
);

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}
