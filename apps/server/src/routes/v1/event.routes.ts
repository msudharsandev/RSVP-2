import { Router } from 'express';
import { createEvent } from '@/controllers/event.controller';
import { createAttendee } from '@/controllers/event.controller';
import { validate } from '@/middleware/validate';
import { CreateEventSchema } from '@/validations/event.validation';
import { attendeePayloadSchema, attendeeParamsSchema } from '@/validations/attendee.validation';
import authMiddleware from '@/middleware/authMiddleware';
import { eventsPlannedByUserReqSchema } from '@/validations/event.validation';
import { plannedByUser } from '@/controllers/event.controller';

const eventRouter: Router = Router();

eventRouter.post('/', authMiddleware, validate({ body: CreateEventSchema }), createEvent);
eventRouter.get(
  '/user',
  authMiddleware,
  validate({ query: eventsPlannedByUserReqSchema }),
  plannedByUser
);
eventRouter.post(
  '/:eventId/attendees',
  authMiddleware,
  validate({ params: attendeeParamsSchema, body: attendeePayloadSchema }),
  createAttendee
);

export { eventRouter };
