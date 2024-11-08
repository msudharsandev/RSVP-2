import { Router } from 'express';
import { createEvent } from '@/controllers/event.controller';
import { validate } from '@/middleware/validate';
import { CreateEventSchema } from '@/validations/event.validation';
import authMiddleware from '@/middleware/authMiddleware';

const eventRouter: Router = Router();

eventRouter.post('/', authMiddleware, validate({ body: CreateEventSchema }), createEvent);

export { eventRouter };
