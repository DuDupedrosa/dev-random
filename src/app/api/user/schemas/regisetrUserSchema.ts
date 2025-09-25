import z from 'zod';

const registerUserSchema = z.object({
  name: z.string().transform((val) => val.trim()),
  password: z
    .string()
    .min(6)
    .transform((val) => val.trim()),
  email: z.email().transform((val) => val.trim()),
  lastName: z.string().nullable(),
});

export default registerUserSchema;
