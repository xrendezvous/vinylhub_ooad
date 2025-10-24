import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
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
