import express from 'express';
import ProfileController from '../controller/Profile.mjs';
import { authMiddleware } from '../middleware/auth.mjs';
import { validate } from '../middleware/bodyValidation.mjs';
import { checkPasswod, checkPasword2 } from '../helpers/index.mjs';

const { Router } = express;

const router = Router();

router.get('/', authMiddleware, ProfileController.getProfileData);
router.patch(
  '/',
  authMiddleware,
  validate([checkPasswod, checkPasword2]),
  ProfileController.updatePassword
);

export default router;
