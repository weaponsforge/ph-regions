import { z } from 'zod'
import { Types } from '@/types/types.js'

import { BooleanValueSchema, MongoIdSchema } from './common.schema.js'

export const StatsDataSchema = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  municipalityId: z.instanceof(Types.ObjectId).or(z.string()),
  numBrgy: z.number()
})

export const StatsApiSchema = StatsDataSchema.pick({
  municipalityId: true
}).extend({
  municipalityId: MongoIdSchema,
  includeMeta: BooleanValueSchema.optional(),
}).strict()

export type TStatsData = z.infer<typeof StatsDataSchema>
