"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_js_1 = require("./app/modules/products/product.routes.js");
const order_routes_js_1 = require("./app/modules/orders/order.routes.js");
const user_routes_js_1 = require("./app/modules/users/user.routes.js");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/products", product_routes_js_1.ProductRoutes);
app.use("/api/orders", order_routes_js_1.OrderRoutes);
app.use("/api/users", user_routes_js_1.UserRoutes);
app.get("/", (req, res) => {
    res.send("Ecommerce  Server is running..!");
});
// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
