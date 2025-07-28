import { z } from 'zod'
import { Types } from '@/types/types.js'

import { BooleanValueSchema } from './common.schema.js'

export const StatsDataSchema = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  municipalityId: z.instanceof(Types.ObjectId).or(z.string()),
  numBrgy: z.number()
})

export const StatsApiSchema = StatsDataSchema.extend({
  includeMeta: BooleanValueSchema
})
  .partial()
  .strict()

export type TStatsData = z.infer<typeof StatsDataSchema>
