import express from 'express';
import FileController from '../controller/File.mjs';
import { authMiddleware } from '../middleware/auth.mjs';

const { Router } = express;

const router = Router();

router.get('/', authMiddleware, FileController.getUserFiles);
router.get('/file', authMiddleware, FileController.download);

export default router;
