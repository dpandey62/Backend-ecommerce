import express from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/products/product.routes.js";
import { OrderRoutes } from "./app/modules/orders/order.routes.js";
import { UserRoutes } from "./app/modules/users/user.routes.js";

const app = express();
const port = process.env.PORT || 5000;

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
  console.log(`Server is running on port ${port}`);
});

export default app;
