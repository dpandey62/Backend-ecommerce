"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
console.log('process.env.MONGODB_URI:', process.env.MONGODB_URI);
console.log('Loaded environment variables:', process.env);
console.log('process.env:', process.env);
exports.default = {
    port: process.env.PORT,
    db_url: process.env.MONGODB_URL,
    jwt_secret: process.env.JWT_SECRET,
};
