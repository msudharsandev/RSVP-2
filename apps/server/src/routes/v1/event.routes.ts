import {
  allPlannedEvents,
  checkAllowStatus,
  createAttendee,
  createEvent,
  deleteEvent,
  editEventSlug,
  filterEvents,
  getAttendeeByQrToken,
  getAttendeeDetails,
  getAttendees,
  getAttendeesExcelSheet,
  getEventById,
  getEventBySlug,
  getPopularEvents,
  plannedByUser,
  softDeleteAttendee,
  updateAttendeeAllowStatus,
  updateEvent,
  verifyQrToken,
} from '@/controllers/event.controller';

import {
  attendeeParamsSchema,
  attendeePayloadSchema,
  idParamsSchema,
  qrTokenSchema,
  verifyQrTokenParamsSchema,
} from '@/validations/attendee.validation';
import {
  attendeesQuerySchema,
  CreateEventSchema,
  eventLimitSchema,
  eventParamsSchema,
  getEventBySlugSchema,
  userUpdateSchema,
} from '@/validations/event.validation';
import { Router } from 'express';

import {
  createNotification,
  getNotification,
  uploadEventImage,
} from '@/controllers/update.controller';
import authMiddleware from '@/middleware/authMiddleware';
import { eventManageMiddleware } from '@/middleware/hostMiddleware';
import { validate } from '@/middleware/validate';
import {
  eventAttendeeReqSchema,
  eventsPlannedByUserReqSchema,
} from '@/validations/event.validation';
import { Role } from '@prisma/client';

const eventRouter: Router = Router();

eventRouter.get('/upload-image', uploadEventImage);

eventRouter.get('/slug/:slug', validate({ params: getEventBySlugSchema }), getEventBySlug);

eventRouter.get('/', allPlannedEvents);

eventRouter.post('/', authMiddleware, validate({ body: CreateEventSchema }), createEvent);

eventRouter.get('/popular', validate({ query: eventLimitSchema }), getPopularEvents);

eventRouter.get('/filter', filterEvents);

eventRouter.get('/:eventId', authMiddleware, getEventById);

eventRouter.patch(
  '/:eventId',
  authMiddleware,
  validate({ params: eventAttendeeReqSchema, body: CreateEventSchema }),
  eventManageMiddleware([Role.Creator]),
  updateEvent
);

eventRouter.delete(
  '/:eventId',
  authMiddleware,
  validate({ params: eventAttendeeReqSchema }),
  eventManageMiddleware([Role.Creator]),
  deleteEvent
);

eventRouter.get(
  '/user',
  authMiddleware,
  validate({ query: eventsPlannedByUserReqSchema }),
  plannedByUser
);

eventRouter.patch(
  '/:id/slug',
  authMiddleware,
  validate({ params: idParamsSchema, body: attendeePayloadSchema }),
  eventManageMiddleware([Role.Creator]),
  editEventSlug
);

eventRouter.post(
  '/:eventId/attendees',
  authMiddleware,
  validate({ params: attendeeParamsSchema }),
  createAttendee
);

eventRouter.get(
  '/:eventId/attendees',
  authMiddleware,
  validate({ params: eventParamsSchema, query: attendeesQuerySchema }),
  eventManageMiddleware([Role.Creator, Role.Manager]),
  getAttendees
);

eventRouter.get(
  '/:eventId/attendees/excel',
  authMiddleware,
  validate({ params: eventParamsSchema }),
  eventManageMiddleware([Role.Creator, Role.Manager]),
  getAttendeesExcelSheet
);

eventRouter.post(
  '/:eventId/communications',
  authMiddleware,
  validate({ params: eventParamsSchema, body: userUpdateSchema }),
  eventManageMiddleware([Role.Creator, Role.Manager]),
  createNotification
);

eventRouter.get(
  '/:eventId/communications',
  authMiddleware,
  validate({ params: eventParamsSchema }),
  getNotification
);
eventRouter.get(
  '/:eventId/attendees/ticket',
  authMiddleware,
  validate({ params: attendeeParamsSchema }),
  getAttendeeDetails
);
eventRouter.patch(
  '/:eventId/attendee/:attendeeId/verify',
  authMiddleware,
  validate({ params: verifyQrTokenParamsSchema }),
  eventManageMiddleware([Role.Creator, Role.Manager]),
  verifyQrToken
);

eventRouter.get(
  '/:eventId/attendee/qr/:qrToken',
  authMiddleware,
  validate({ params: qrTokenSchema }),
  eventManageMiddleware([Role.Creator, Role.Manager]),
  getAttendeeByQrToken
);

eventRouter.patch(
  '/:eventId/attendee/:userId/allowStatus',
  authMiddleware,
  validate({ params: eventParamsSchema }),
  eventManageMiddleware([Role.Creator, Role.Manager]),
  checkAllowStatus
);

eventRouter.patch(
  '/:eventId/attendee/allowStatus',
  authMiddleware,
  validate({ params: eventParamsSchema }),
  eventManageMiddleware([Role.Creator, Role.Manager]),
  updateAttendeeAllowStatus
);

eventRouter.delete(
  '/:eventId/attendee',
  authMiddleware,
  validate({ params: eventParamsSchema }),
  softDeleteAttendee
);

export { eventRouter };
