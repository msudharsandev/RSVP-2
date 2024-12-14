import { prisma } from '../connection';

export class Cohosts {
  static async findById(id: string) {
    return await prisma.cohost.findUnique({
      where: { id },
    });
  }

  static async create(data: any) {
    return await prisma.cohost.create({
      data,
    });
  }

  static async delete(id: string) {
    return await prisma.cohost.delete({
      where: { id },
    });
  }

  static async update(id: string, data: any) {
    return await prisma.cohost.update({
      where: { id },
      data,
    });
  }

  static async findByUserIdAndEventId(userId: number, eventId: string) {
    return await prisma.cohost.findFirst({
      where: {
        userId,
        eventId,
      },
    });
  }
}
