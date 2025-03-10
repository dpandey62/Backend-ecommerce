import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ProductRoutes } from "./app/modules/products/product.routes";
import { OrderRoutes } from "./app/modules/orders/order.routes";
import { UserRoutes } from "./app/modules/users/user.routes";


dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;
const db_url = process.env.DB_URL;

if (!db_url) {
  console.error(" MongoDB connection string is missing!");
  process.exit(1);
}

// MongoDB connection
mongoose
  .connect(db_url )
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/users", UserRoutes);

app.get("/", (req, res) => {
  res.send("Ecommerce Inventory Server is running..!");
});

// Start Server
app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});

export default app;
