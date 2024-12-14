import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';
import { Events } from '@/db/models/events';
import { Attendees } from '@/db/models/attendees';
import { Cohosts } from '@/db/models/coHosts';

async function isHostOrCohost(userId: number, eventId: string) {
  const event = await Events.findById(eventId);
  if (event?.creatorId === userId) {
    return true;
  }

  const cohost = await Cohosts.findByUserIdAndEventId(userId, eventId);
  return !!cohost;
}

export const canAccessAttendeeById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const attendeeId = req.params.attendeeId;

    const attendee = await Attendees.findById(attendeeId);
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }

    if (attendee.userId === userId) {
      return next();
    }

    const hasAccess = await isHostOrCohost(userId, attendee.eventId);
    if (hasAccess) {
      return next();
    }

    return res.status(403).json({ message: 'Unauthorized access' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const canAccessAttendeeByQrToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { eventId, qrToken } = req.params;

    const attendee = await Attendees.findByQrToken(qrToken);
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }

    if (attendee.eventId !== eventId) {
      return res.status(400).json({ message: 'Invalid event ID for this QR token' });
    }

    if (attendee.userId === userId) {
      return next();
    }

    const hasAccess = await isHostOrCohost(userId, eventId);
    if (hasAccess) {
      return next();
    }

    return res.status(403).json({ message: 'Unauthorized access' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const canVerifyQrToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const { eventId } = req.body;

    const hasAccess = await isHostOrCohost(userId, eventId);
    if (!hasAccess) {
      return res.status(403).json({ message: 'Only hosts and cohosts can verify QR tokens' });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
