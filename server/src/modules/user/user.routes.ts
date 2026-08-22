import { Router } from 'express';
import { getMe } from './user.controller.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

router.get('/me', authenticateToken, getMe);

export default router;