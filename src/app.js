import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { seedDatabase } from "./config/seed.js";
import routes from "./routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);
export { app };

const startServer = async () => {
    try {
        await connectDB();
        console.log("Database connected.");

        await seedDatabase();
        console.log("Database seeded.");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "vitest") {
    startServer();
}
