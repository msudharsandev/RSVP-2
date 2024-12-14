import {
  createAttendee,
  createEvent,
  deleteEvent,
  plannedByUser,
  updateEvent,
} from '@/controllers/event.controller';
import { Router } from 'express';
import { validate } from '@/middleware/validate';
import {
  CreateEventSchema,
  eventParamsSchema,
  userUpdateSchema,
} from '@/validations/event.validation';
import { attendeePayloadSchema, attendeeParamsSchema } from '@/validations/attendee.validation';
import authMiddleware from '@/middleware/authMiddleware';
import { eventManageMiddleware } from '@/middleware/hostMiddleware';
import {
  eventAttendeeReqSchema,
  eventsPlannedByUserReqSchema,
} from '@/validations/event.validation';
import { createNotification, getNotification } from '@/controllers/update.controller';

const eventRouter: Router = Router();

eventRouter.post('/', authMiddleware, validate({ body: CreateEventSchema }), createEvent);

eventRouter.patch(
  '/:eventId',
  authMiddleware,
  validate({ params: eventAttendeeReqSchema, body: CreateEventSchema }),
  updateEvent
);

eventRouter.delete(
  '/:eventId',
  authMiddleware,
  validate({ params: eventAttendeeReqSchema }),
  eventManageMiddleware(['Admin']),
  deleteEvent
);

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

eventRouter.post(
  '/:eventId/communications',
  authMiddleware,
  validate({ params: eventParamsSchema, body: userUpdateSchema }),
  createNotification
);

eventRouter.get(
  '/:eventId/communications',
  authMiddleware,
  validate({ params: eventParamsSchema }),
  getNotification
);

export { eventRouter };
