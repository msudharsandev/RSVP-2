import { IUpdate } from '@/interface/update';
import { prisma } from '../connection';

export class Update {
  static async create(notificationDetails: IUpdate) {
    const newNotification = await prisma.update.create({
      data: {
        ...notificationDetails,
      },
    });
    return newNotification;
  }

  static async findById(eventId: string) {
    const event = await prisma.update.findMany({
      where: { eventId },
    });
    console.log('event details:', event);
    return event;
  }
}
