import express from "express";
import { json } from "body-parser";
import { routes } from "./routes.js";

export const app = express();
app.use(json());
app.use("/api", routes);
