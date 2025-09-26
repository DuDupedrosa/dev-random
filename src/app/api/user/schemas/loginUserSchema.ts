import z from 'zod';

const loginUserSchema = z.object({
  password: z
    .string()
    .min(1)
    .transform((val) => val.trim()),
  email: z.email().transform((val) => val.trim()),
});

export default loginUserSchema;
