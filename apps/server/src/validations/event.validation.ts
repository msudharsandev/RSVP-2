import z from 'zod';

export enum PAGINATION_ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

export const CreateEventSchema = z
  .object({
    name: z.string().max(256),
    category: z.string().max(256),
    description: z.string().max(512),
    eventImageId: z.string().max(256),
    venueType: z.enum(['physical', 'virtual']),
    venueAddress: z.string().max(256).optional(),
    venueUrl: z.string().url().max(256).optional(),
    hostPermissionRequired: z.boolean(),
    capacity: z.number().int().positive(),
    startTime: z.string(),
    endTime: z.string(),
    eventDate: z.string(),
  })
  .refine(
    (data) => {
      if (data.venueType === 'physical') {
        return data.venueAddress !== null && data.venueUrl == null;
      }
      if (data.venueType === 'virtual') {
        return data.venueUrl !== null && data.venueAddress == null;
      }
      return false;
    },
    {
      message:
        'Physical events must have a venue address (not URL), virtual events must have a URL (not address)',
      path: ['venueType'],
    }
  );

export const eventsPlannedByUserReqSchema = z.object({
  email: z.string().min(1, { message: 'email is required' }).email(),
  type: z.string().min(1, { message: 'type is required' }),
  fromDate: z.string(),
  toDate: z.string(),
  search: z.string().max(256).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  sortBy: z.string().max(256).optional(),
  sortOrder: z.enum([PAGINATION_ORDER.ASC, PAGINATION_ORDER.DESC]).optional(),
});
