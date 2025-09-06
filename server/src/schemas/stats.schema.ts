import { z } from 'zod'

import {
  BooleanValueSchema,
  MongoVersionSchema,
  MongoCreatedAtSchema,
  MongoUpdatedAtSchema,
  ObjectIdSchema
} from './common.schema.js'

export const StatsDataSchema = z.object({
  _id: ObjectIdSchema,
  __v: MongoVersionSchema,
  createdAt: MongoCreatedAtSchema,
  updatedAt: MongoUpdatedAtSchema,

  municipalityId: ObjectIdSchema.meta({
    description: 'Municipality ID',
    example: '68bc452bf0a9414a4312e753'
  }),

  numBrgy: z
    .number()
    .meta({
      description: 'Random number of barangays within the municipality',
      example: 97
    })
})

export const StatsApiSchema = StatsDataSchema.extend({
  includeMeta: BooleanValueSchema
})
  .partial()
  .strict()

export type TStatsData = z.infer<typeof StatsDataSchema>
