import express from 'express';
import { authMiddleware } from '../middleware/auth.mjs';
import DataController from '../controller/Data.mjs';

const { Router } = express;

const router = Router();

router.get('/', authMiddleware, DataController.getUserData);
router.patch('/', authMiddleware, DataController.updateUserData);
router.patch('/user', authMiddleware, DataController.removeFromData);
router.post('/', authMiddleware, DataController.saveDataToFile);

export default router;
