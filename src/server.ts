import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

import { ProductRoutes } from "./app/modules/products/product.routes.js";
import { OrderRoutes } from "./app/modules/orders/order.routes.js";
import { UserRoutes } from "./app/modules/users/user.routes.js";

dotenv.config();

const app = express();

// connect DB (singleton inside connectDB)
connectDB().catch(err => {
  console.error("Initial DB connection failed:", err);
  // Do not process.exit in serverless environment — just log it.
});

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/users", UserRoutes);

// Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.get("/", (req, res) => {
  res.send("Ecommerce Inventory Server (Vercel) — root.");
});

export default app;
