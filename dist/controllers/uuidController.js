"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUUIDEntry = exports.validateUUID = void 0;
const UUIDEntry_1 = __importDefault(require("../models/UUIDEntry"));
const validateUUID = async (ctx) => {
    const { uuid } = ctx.params;
    try {
        const entry = await UUIDEntry_1.default.findOne({
            uuid,
            expiresAt: { $gt: new Date() },
            resolvedAt: null
        });
        if (!entry) {
            ctx.status = 404;
            ctx.body = {
                valid: false,
                message: 'UUID is invalid, expired, or already resolved'
            };
            return;
        }
        ctx.status = 200;
        ctx.body = {
            valid: true,
            jsonSchema: entry.jsonSchema
        };
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = {
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};
exports.validateUUID = validateUUID;
const createUUIDEntry = async (ctx) => {
    const { uuid, jsonSchema, expiresAt } = ctx.request.body;
    try {
        const newEntry = new UUIDEntry_1.default({
            uuid,
            jsonSchema,
            expiresAt: new Date(expiresAt)
        });
        await newEntry.save();
        ctx.status = 201;
        ctx.body = {
            message: 'UUID entry created successfully',
            uuid: newEntry.uuid
        };
    }
    catch (error) {
        ctx.status = 500;
        ctx.body = {
            error: 'Could not create UUID entry',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};
exports.createUUIDEntry = createUUIDEntry;
