import * as z from 'zod';

export const ogImageSchema = z.object({
  heading: z.string(),
  type: z.string(),
  mode: z.enum(['light', 'dark']).default('dark'),
  width: z.string().default('1748'),
  height: z.string().default('2480'),
});
