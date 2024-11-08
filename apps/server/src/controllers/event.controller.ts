import { Events } from '@/db/models/events';
import { Users } from '@/db/models/users';
import { AuthenticatedRequest } from '@/middleware/authMiddleware';
import catchAsync from '@/utils/catchAsync';
import { CreateEventSchema } from '@/validations/event.validation';
import z from 'zod';

type createEventBody = z.infer<typeof CreateEventSchema>;

export const createEvent = catchAsync(
  async (req: AuthenticatedRequest<{}, {}, createEventBody>, res) => {
    const data = req.body;

    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: 'Invalid or expired token' });

    const getUserData = await Users.findById(userId);

    if (getUserData?.is_completed) {
      const formattedData = {
        ...data,
        creatorId: userId,
      };

      const newEvent = await Events.create(formattedData);

      return res.status(201).json({ message: 'success', event: newEvent });
    } else {
      return res
        .status(400)
        .json({ message: 'Please complete your profile before creating event' });
    }
  }
);
