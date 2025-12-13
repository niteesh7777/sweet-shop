import { Router } from 'express';
import { register } from './auth.controller.js';
import { validate } from '../../middleware/validate.js';
import { registerSchema } from './auth.schemas.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.post('/register', validate(registerSchema), register);

router.get('/me', authMiddleware, (_req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
