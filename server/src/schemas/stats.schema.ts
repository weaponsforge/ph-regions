import { z } from 'zod'
import { Types } from '@/types/types.js'

import {
  BooleanValueSchema,
  MongoVersionSchema,
  MongoCreatedAtSchema,
  MongoUpdatedAtSchema,
  ObjectIdSchema
} from './common.schema.js'

// Main Zod schema

export const StatsDataSchema = z.object({
  _id: ObjectIdSchema,
  __v: MongoVersionSchema,
  createdAt: MongoCreatedAtSchema,
  updatedAt: MongoUpdatedAtSchema,

  municipalityId: z.instanceof(Types.ObjectId).or(ObjectIdSchema),

  numBrgy: z
    .number()
    .meta({
      description: 'Random number of barangays within the municipality',
      example: 97
    })
})

// Zod ID definitions for OpenAPI docs
export const StatsDocSchema = StatsDataSchema.extend({
  municipalityId: ObjectIdSchema.meta({
    description: 'Municipality ID',
    example: '68bc452bf0a9414a4312e753'
  })
})

// Zod filters for API query
export const StatsApiSchema = StatsDataSchema.extend({
  includeMeta: BooleanValueSchema
})
  .partial()
  .strict()

export type TStatsData = z.infer<typeof StatsDataSchema>
