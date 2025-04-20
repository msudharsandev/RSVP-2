import { Router } from 'express';
import authMiddleware from '@/middleware/authMiddleware';
import { validate } from '@/middleware/validate';
import { profilePayloadSchema } from '@/validations/users.validation';
import {
  getUserPublicController,
  updateUserProfileController,
} from '@/controllers/user.controller';

const userRouter: Router = Router();

userRouter.post(
  '/profile',
  authMiddleware,
  validate({ body: profilePayloadSchema }),
  updateUserProfileController
);

userRouter.get('/:username', authMiddleware, getUserPublicController);

export { userRouter };
