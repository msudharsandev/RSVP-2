import z from "zod";

const secondaryEmailSchema = z
  .object({
    secondary_email: z.string().email(),
  })
  .strict();

const contactNumberSchema = z
  .object({
    contact: z.string(),
  })
  .strict();

const fullProfileSchema = z
  .object({
    full_name: z.string().min(1),
    location: z.string(),
    bio: z.string(),
    isProfilePublic: z.boolean(),
    profile_icon: z.string(),
    twitter: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
  })
  .strict();

export const profilePayloadSchema = z.union([
  secondaryEmailSchema,
  contactNumberSchema,
  fullProfileSchema,
]);
