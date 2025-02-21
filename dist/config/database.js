"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:PeeIiQrVuAgsqXVgYJnwYupVAabxmSAg@crossover.proxy.rlwy.net:17477';
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI, {
            // @ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.log(MONGO_URI);
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
exports.default = connectDB;
