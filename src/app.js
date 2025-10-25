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

const PORT = process.env.PORT || 3000;

export { app };

if (process.env.NODE_ENV !== "test") {
    const startServer = async () => {
        try {
            await connectDB();
            await seedDatabase();
            app.listen(PORT, () => {
                console.log(`Server running on http://localhost:${PORT}`);
            });
        } catch (error) {
            console.error("Failed to start server:", error);
        }
    };
    startServer();
}
