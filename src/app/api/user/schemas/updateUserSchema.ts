import z from 'zod';

export const updateUserSchema = z.object({
  name: z.string().transform((val) => val.trim()),
  lastName: z.string().nullable(),
});
