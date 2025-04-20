import {
  getMyDataController,
  signinController,
  verifySigninController,
  logoutController,
} from '@/controllers/auth.controller';
import authMiddleware from '@/middleware/authMiddleware';
import { validate } from '@/middleware/validate';
import { SigninSchema, verifySigninSchema } from '@/validations/auth.validation';
import { Router } from 'express';

const authRouter: Router = Router();

authRouter.post('/signin', validate({ body: SigninSchema }), signinController);

authRouter.post('/verify-signin', validate({ body: verifySigninSchema }), verifySigninController);

authRouter.post('/logout', authMiddleware, logoutController);

authRouter.get('/me', authMiddleware, getMyDataController);

export { authRouter };
