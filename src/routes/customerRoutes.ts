/**
 * @openapi
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - customerId
 *         - formData
 *       properties:
 *         customerId:
 *           type: string
 *         formData:
 *           type: object
 *           properties:
 *             vehicleData:
 *               type: object
 *               properties:
 *                 make:
 *                   type: string
 *                 model:
 *                   type: string
 *                 year:
 *                   type: number
 *                 vin:
 *                   type: string
 *                 hsnTsn:
 *                   type: string
 *                 licensePlate:
 *                   type: string
 *                 firstRegistration:
 *                   type: string
 *                   description: Date in the format "yyyy-MM-dd"
 *                 firstRegistrationOwner:
 *                   type: string
 *                   description: Date in the format "yyyy-MM-dd"
 *                 currentMileage:
 *                   type: string
 *             driverInfo:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 dob:
 *                   type: string
 *                   description: Date in the format "yyyy-MM-dd"
 *                 licenseNumber:
 *                   type: string
 *                 maritalStatus:
 *                   type: string
 *             insuranceWishes:
 *               type: object
 *               properties:
 *                 coverageType:
 *                   type: string
 *                 deductible:
 *                   type: number
 *                 insuranceStart:
 *                   type: string
 *                   description: Date in the format "yyyy-MM-dd"
 *             personalData:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *                 street:
 *                   type: string
 *                 houseNumber:
 *                   type: string
 *                 postalCode:
 *                   type: string
 *                 city:
 *                   type: string
 *             paymentInfo:
 *               type: object
 *               properties:
 *                 iban:
 *                   type: string
 *             guid:
 *               type: string
 *     CustomerResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Customer'
 *         message:
 *           type: string
 */

/**
 * @openapi
 * /api/customers:
 *   post:
 *     summary: Save customer data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponse'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponse'
 *   get:
 *     summary: Get all customer data
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponse'
 */

/**
 * @openapi
 * /api/customers/{customerId}:
 *   get:
 *     summary: Get customer data by ID
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponse'
 *       '404':
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponse'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponse'
 *   delete:
 *     summary: Delete customer data by ID
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponse'
 *       '404':
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponse'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponse'
 */

import Router from '@koa/router';
import { createCustomer, getCustomerById, getAllCustomers, deleteCustomerById } from '../controllers/customerController';

const router = new Router();

router.post('/customers', createCustomer);
router.get('/customers/:customerId', getCustomerById);
router.get('/customers', getAllCustomers);
router.delete('/customers/:customerId', deleteCustomerById);

export default router;
