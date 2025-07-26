import { z } from 'zod'
import { Types } from '@/types/types.js'

export const StatsDataSchema = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  municipalityId: z.instanceof(Types.ObjectId).or(z.string()),
  numBrgy: z.number()
})

export const StatsApiSchema = StatsDataSchema.pick({
  _id: true,
  __v: true,
  municipalityId: true
}).extend({
  municipalityId: z.string().optional()
}).strict()

export type TStatsData = z.infer<typeof StatsDataSchema>
