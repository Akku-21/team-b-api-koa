"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'UUID Validator API',
        version: '1.0.0',
        description: 'API for validating and managing UUIDs with JSON schemas'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local development server'
        }
    ]
};
const options = {
    swaggerDefinition,
    apis: [
        path_1.default.join(__dirname, '../routes/*'),
        path_1.default.join(__dirname, '../controllers/*')
    ]
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
