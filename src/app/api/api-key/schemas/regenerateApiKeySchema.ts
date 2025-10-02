import z from 'zod';

const regenerateApiKetSchema = z.object({
  apiKeyId: z
    .string()
    .min(1)
    .transform((val) => val.trim()),
});

export default regenerateApiKetSchema;
