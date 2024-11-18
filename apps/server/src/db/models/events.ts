import { VenueType } from '@prisma/client';
import { prisma } from '../connection';

interface IEvent {
  creatorId: number;
  name: string;
  category: string;
  startTime: string;
  endTime: string;
  eventDate: string;
  description: string;
  eventImageId: string;
  venueType: VenueType;
  venueAddress?: string;
  venueUrl?: string;
  hostPermissionRequired: boolean;
}

interface IEventFilters {
  email: string;
  type?: string;
  fromDate?: Date;
  toDate?: Date;
  search?: string;
}

export interface IPaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class Events {
  static async create(eventDetails: IEvent) {
    const newEvent = await prisma.event.create({
      data: {
        ...eventDetails,
      },
    });
    return newEvent;
  }

  static async plannedEvents({
    filters,
    pagination = { page: 1, limit: 10 },
  }: {
    filters: IEventFilters;
    pagination: IPaginationParams;
  }) {
    const { email, type, fromDate, toDate, search } = filters;
    const { page = 1, limit = 10, sortBy = 'eventDate', sortOrder = 'asc' } = pagination;

    const skip = (page - 1) * limit;

    const where = {
      Attendee: {
        some: {
          user: {
            primary_email: email,
          },
        },
      },
      ...(type && { category: type }),
      ...(fromDate &&
        toDate && {
          eventDate: {
            gte: fromDate,
            lte: toDate,
          },
        }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [total, events] = await Promise.all([
      prisma.event.count({ where }),
      prisma.event.findMany({
        where,
        take: limit,
        skip,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          Attendee: {
            include: {
              user: {
                select: {
                  primary_email: true,
                  full_name: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return {
      events,
      metadata: {
        total,
        page,
        limit,
        hasMore: skip + events.length < total,
      },
    };
  }

  static async findById(eventId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });
    return event;
  }
}
