import {
  addEventHostController,
  getEventHostController,
  removeEventCohostController,
} from '@/controllers/cohost.controller';
import authMiddleware from '@/middleware/authMiddleware';
import { validate } from '@/middleware/validate';
import { addCohostSchema } from '@/validations/cohost.validation';
import { eventParamsSchema } from '@/validations/event.validation';
import { Router } from 'express';

const cohostRouter: Router = Router();

cohostRouter.get(
  '/events/:eventId',
  authMiddleware,
  validate({ params: eventParamsSchema }),
  getEventHostController
);

cohostRouter.delete('/events/:eventId/:cohostUserId', authMiddleware, removeEventCohostController);

cohostRouter.post('/', authMiddleware, validate({ body: addCohostSchema }), addEventHostController);

export { cohostRouter };
