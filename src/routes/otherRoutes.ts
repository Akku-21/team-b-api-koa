/**
 * @openapi
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *     ClearDataResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 */

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Authenticate a broker
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 */

/**
 * @openapi
 * /api/clearAllData:
 *   post:
 *     summary: Clear all data
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClearDataResponse'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClearDataResponse'
 */

import Router from '@koa/router';
import { login, clearAllData } from '../controllers/otherController';

const router = new Router();

router.post('/login', login);
router.post('/clearAllData', clearAllData);

export default router;
