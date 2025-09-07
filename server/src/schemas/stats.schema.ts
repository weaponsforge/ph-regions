import { z } from 'zod'
import { Types } from '@/types/types.js'

import { BooleanValueSchema, ObjectIdSchema } from './common.schema.js'
import { MongoDocsDefault } from './mongodoc.schema.js'

// Main Zod schema

export const StatsDataSchema = MongoDocsDefault.extend({
  municipalityId: z.instanceof(Types.ObjectId).or(ObjectIdSchema),

  numBrgy: z
    .number()
    .meta({
      description: 'Random number of barangays within the municipality',
      example: 97
    })
})

// Zod ID definitions for OpenAPI docs (accepts string instead of ObjectId)
export const StatsDocSchema = StatsDataSchema.extend({
  includeMeta: BooleanValueSchema,

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
