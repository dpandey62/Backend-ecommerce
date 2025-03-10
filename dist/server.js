"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_routes_1 = require("./app/modules/products/product.routes");
const order_routes_1 = require("./app/modules/orders/order.routes");
const user_routes_1 = require("./app/modules/users/user.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const db_url = process.env.DB_URL;
if (!db_url) {
    console.error(" MongoDB connection string is missing!");
    process.exit(1);
}
// MongoDB connection
mongoose_1.default
    .connect(db_url)
    .then(() => console.log(" Connected to MongoDB"))
    .catch((err) => {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
});
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/products", product_routes_1.ProductRoutes);
app.use("/api/orders", order_routes_1.OrderRoutes);
app.use("/api/users", user_routes_1.UserRoutes);
app.get("/", (req, res) => {
    res.send("Ecommerce Inventory Server is running..!");
});
// Start Server
app.listen(port, () => {
    console.log(` Server is running on port ${port}`);
});
exports.default = app;
