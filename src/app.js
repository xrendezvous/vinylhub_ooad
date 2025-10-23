import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import routes from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await connectDB();
    console.log("Server running on http://localhost:${PORT}");
});

