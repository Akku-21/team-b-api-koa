"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const uuidController_1 = require("../controllers/uuidController");
const router = new router_1.default();
/**
 * @openapi
 * /api/validate/{uuid}:
 *   get:
 *     summary: Validate a UUID
 *     description: Checks if a UUID is valid, not expired, and not resolved
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: UUID is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 jsonSchema:
 *                   type: object
 *       404:
 *         description: UUID is invalid, expired, or already resolved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get('/validate/:uuid', uuidController_1.validateUUID);
/**
 * @openapi
 * /api/create:
 *   post:
 *     summary: Create a new UUID entry
 *     description: Creates a new UUID entry with a JSON schema and expiration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 format: uuid
 *               jsonSchema:
 *                 type: object
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: UUID entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 uuid:
 *                   type: string
 *       500:
 *         description: Error creating UUID entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 details:
 *                   type: string
 */
router.post('/create', uuidController_1.createUUIDEntry);
exports.default = router;
