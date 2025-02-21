"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UUIDEntrySchema = new mongoose_1.default.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    jsonSchema: {
        type: Object,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    resolvedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('UUIDEntry', UUIDEntrySchema);
