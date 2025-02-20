import Router from '@koa/router';
import { validateUUID, createUUIDEntry } from '../controllers/uuidController';

const router = new Router();

router.get('/validate/:uuid', validateUUID);
router.post('/create', createUUIDEntry);

export default router;
