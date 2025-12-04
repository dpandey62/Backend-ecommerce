import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { ProductRoutes } from "./app/modules/products/product.routes.js";
import { OrderRoutes } from "./app/modules/orders/order.routes.js";
import { UserRoutes } from "./app/modules/users/user.routes.js";

dotenv.config();

const app = express();
const db_url = process.env.DB_URL;

// --------------------
// FIX: Stable MongoDB connection for Vercel
// --------------------
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(db_url);
    isConnected = conn.connections[0].readyState === 1;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
}

connectDB();

// --------------------
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/users", UserRoutes);

// ROOT
app.get("/", (req, res) => {
  res.send("Ecommerce Inventory Server running on Vercel!");
});

// ❌ DO NOT USE LISTEN() ON VERCEL
// app.listen(5000, () => console.log("Server started"));

export default app;
