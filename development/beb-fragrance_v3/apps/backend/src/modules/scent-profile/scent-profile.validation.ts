import { z } from 'zod';

export const scentProfileSchema = z.object({
  families: z.array(z.string()).min(1, 'Kamida 1 ta hid oilasi tanlang.'),
  notes: z.array(z.string()).min(1, 'Kamida 1 ta nota tanlang.'),
  intensity: z.enum(['light', 'moderate', 'strong']),
  seasons: z.array(z.enum(['spring', 'summer', 'autumn', 'winter'])).min(1),
  occasions: z.array(z.string()).min(1, 'Kamida 1 ta munosabat tanlang.'),
});
