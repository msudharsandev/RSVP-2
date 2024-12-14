import z from 'zod';

export const attendeePayloadSchema = z.object({
  feedback: z.string().max(512).optional(),
});

export const attendeeParamsSchema = z.object({
  eventId: z.string().uuid(),
});

export const attendeeIdSchema = z.object({
  attendeeId: z.string().uuid(),
});

export const verifyQrTokenPayloadSchema = z.object({
  qrToken: z.string(),
  eventId: z.string().uuid(),
});

export const qrTokenSchema = z.object({
  qrToken: z.string().length(6),
});
