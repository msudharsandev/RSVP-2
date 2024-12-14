import z from 'zod';
import { Events } from '@/db/models/events';
import { Update } from '@/db/models/update';
import { AuthenticatedRequest } from '@/middleware/authMiddleware';
import { userUpdateSchema } from '@/validations/event.validation';
import catchAsync from '@/utils/catchAsync';

type createNotificationBody = z.infer<typeof userUpdateSchema>;

export const createNotification = catchAsync(
  async (req: AuthenticatedRequest<{ eventId?: string }, {}, createNotificationBody>, res) => {
    const data = req.body;
    const param = req.params;

    const event = await Events.findById(param.eventId as string);
    console.log('event details:', event);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    console.log('event exists');

    const notificationData = {
      content: data.content,
      eventId: param.eventId as string,
      isNotification: true,
      scheduledNotificationTime: new Date(),
    };

    const newNotification = await Update.create(notificationData);
    return res.status(201).json(newNotification);
  }
);

export const getNotification = catchAsync(
  async (req: AuthenticatedRequest<{ eventId?: string }, {}>, res) => {
    const param = req.params;

    const event = await Events.findById(param.eventId as string);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const getNotificationData = await Update.findById(param.eventId as string);

    console.log('getNotificationData', getNotificationData);

    if (!getNotificationData) {
      return res.status(404).json({ message: 'Notification not found' });
    } else {
      return res.status(200).json(getNotificationData);
    }
  }
);
