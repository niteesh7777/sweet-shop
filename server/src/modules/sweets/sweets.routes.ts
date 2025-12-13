import { Router } from 'express';
import { create, list } from './sweets.controller.js';
import { requireAdmin } from '../../middleware/roleMiddleware.js';
import { search } from './sweets.controller.js';
import { purchase, restock } from './sweets.controller.js';

const router = Router();

router.post('/', requireAdmin, create);
router.get('/', list);

router.get('/search', search);
router.post('/:id/purchase', purchase);
router.post('/:id/restock', requireAdmin, restock);

export default router;
