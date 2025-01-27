import { z } from 'zod';

export const secondaryEmailFormSchema = z
  .object({
    email: z.string().email().optional(),
    secondary_email: z
      .string()
      .email()
      .nullable()
      .optional()
      .transform((val) => (val === '' ? null : val)),
  })
  .refine(
    (data) => {
      if (!data.secondary_email || !data.email) return true;
      return data.secondary_email.toLowerCase() !== data.email.toLowerCase();
    },
    {
      message: "Secondary email can't be the same as primary email",
      path: ['secondary_email'],
    }
  );

export type SecondaryEmailFormType = z.infer<typeof secondaryEmailFormSchema>;

export const phoneNumberFormSchema = z.object({
  contact: z
    .string()
    .regex(/^\d+$/, 'Only numbers are allowed')
    .length(10, 'Phone number must be 10 digits'),
});

export type PhoneNumberFormType = z.infer<typeof phoneNumberFormSchema>;

export const profileFormSchema = z.object({
  full_name: z
    .string()
    .min(1)
    .refine((val) => !/^[\d\s]+$/.test(val.trim()), 'Cannot contain only numbers'),
  location: z
    .string()
    .refine((val) => !val || !/^[\d\s]+$/.test(val.trim()), 'Cannot contain only numbers'),
  bio: z.string().default(''),
  profile_icon: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  secondary_email: z.string().email().optional(),
});

export type ProfileFormType = z.infer<typeof profileFormSchema>;

const profileUpdateSchema = z.union([
  secondaryEmailFormSchema,
  phoneNumberFormSchema,
  profileFormSchema,
]);

export type UpdateProfilePayload = z.infer<typeof profileUpdateSchema>;
