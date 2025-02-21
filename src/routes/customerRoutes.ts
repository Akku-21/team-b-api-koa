import Router from '@koa/router';
import { createCustomer, getCustomerById, getAllCustomers, deleteCustomerById } from '../controllers/customerController';

const router = new Router();

router.post('/customers', createCustomer);
router.get('/customers/:customerId', getCustomerById);
router.get('/customers', getAllCustomers);
router.delete('/customers/:customerId', deleteCustomerById);

export default router;
