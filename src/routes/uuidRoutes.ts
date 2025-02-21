/**
 * @openapi
 * components:
 *   schemas:
 *     UUIDEntry:
 *       type: object
 *       properties:
 *         guid:
 *           type: string
 *         timestamp:
 *           type: number
 *         name:
 *           type: string
 *         email:
 *           type: string
 *     UUIDEntryResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UUIDEntry'
 *         message:
 *           type: string
 */

/**
 * @openapi
 * /api/getAllGuids:
 *   get:
 *     summary: Get all GUIDs
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UUIDEntryResponse'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UUIDEntryResponse'
 */

/**
 * @openapi
 * /api/saveAllGuids:
 *   post:
 *     summary: Save all GUIDs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/UUIDEntry'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UUIDEntryResponse'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UUIDEntryResponse'
 */

/**
 * @openapi
 * /api/getAllInvitationLinks:
 *   get:
 *     summary: Get all invitation links
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UUIDEntryResponse'
 */

/**
 * @openapi
 * /api/saveAllInvitationLinks:
 *   post:
 *     summary: Save all invitation links
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties:
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UUIDEntryResponse'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UUIDEntryResponse'
 */

import Router from '@koa/router';
import { getAllGuids, saveAllGuids, getAllInvitationLinks, saveAllInvitationLinks } from '../controllers/uuidController';

const router = new Router();

router.get('/getAllGuids', getAllGuids);
router.post('/saveAllGuids', saveAllGuids);
router.get('/getAllInvitationLinks', getAllInvitationLinks);
router.post('/saveAllInvitationLinks', saveAllInvitationLinks);

export default router;
