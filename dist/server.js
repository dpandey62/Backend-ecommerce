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

// ------------------------------
// FIX for Vercel: persistent MongoDB connection
// ------------------------------
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(db_url, {
      dbName: "ecommerce",
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
  }
}

connectDB();

// ------------------------------
// Middleware
// ------------------------------
app.use(express.json());
app.use(cors());

// ------------------------------
// Routes
// ------------------------------
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/users", UserRoutes);

app.get("/", (req, res) => {
  res.send("Ecommerce Inventory Server is running on Vercel!");
});

// ------------------------------
// ❌ DO NOT USE app.listen() ON VERCEL
// ------------------------------
// app.listen(5000, () => console.log("Server running")); // REMOVE THIS

export default app;
