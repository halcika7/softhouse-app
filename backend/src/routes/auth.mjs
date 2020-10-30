import express from 'express';
import validator from 'express-validator';

import AuthController from '../controller/Auth.mjs';
import passport, { PassportService } from '../service/Passport.mjs';
import { validate } from '../middleware/bodyValidation.mjs';
import { UserRepository } from '../repository/User.mjs';
import { HashService } from '../service/Hash.mjs';
import { authMiddleware } from '../middleware/auth.mjs';
import { checkPasswod, checkPasword2 } from '../helpers/index.mjs';

const { Router } = express;

const router = Router();

const { check } = validator;

router.post(
  '/',
  validate([
    check('username').custom(async (value, { req }) => {
      const user = await UserRepository.findByEmailOrUsername(value);
      if (!user) {
        throw new Error('Invalid Username / Email or password');
      }

      const isValidPassword = await HashService.compare(
        req.body.password,
        user.password
      );

      if (!isValidPassword) {
        throw new Error('Invalid Username / Email or password');
      }
    }),
  ]),
  AuthController.login
);

router.post(
  '/register',
  validate([
    check('username').isLength({ min: 1 }).withMessage('Username is required'),
    check('username')
      .custom(async username => {
        const user = await UserRepository.findByEmailOrUsername(username);
        if (user) {
          throw new Error();
        }

        return true;
      })
      .withMessage('Username already in use'),
    check('email').isEmail().withMessage('Email is not valid'),
    check('email')
      .custom(async email => {
        const user = await UserRepository.findByEmail(email);
        if (user) {
          throw new Error();
        }

        return true;
      })
      .withMessage('Email already in use'),
    checkPasswod,
    checkPasword2,
  ]),
  AuthController.register
);

router.get('/refresh', AuthController.refreshToken);
router.post('/logout', authMiddleware, AuthController.logout);

router.get('/github', passport.authenticate('github', { scope: ['user'] }));
router.get('/github/callback', (req, res) =>
  PassportService.socialCallback(req, res)
);

export default router;
