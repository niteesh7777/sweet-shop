import { Router } from 'express';
import { create, list } from './sweets.controller.js';
import { requireAdmin } from '../../middleware/roleMiddleware.js';

const router = Router();

router.post('/', requireAdmin, create);
router.get('/', list);

export default router;
