import { Router } from 'express';
import { authRouter } from './auth.routes';
import { userRouter } from './users.routes';
import { eventRouter } from './event.routes';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/event', eventRouter);

export { router };
