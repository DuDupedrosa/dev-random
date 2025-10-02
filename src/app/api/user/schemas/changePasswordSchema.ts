import z from 'zod';

const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6)
    .transform((val) => val.trim()),
  newPassword: z
    .string()
    .min(6)
    .transform((val) => val.trim()),
});

export default changePasswordSchema;
