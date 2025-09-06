import { z } from 'zod'

import {
  BooleanValueSchema,
  MongoVersionSchema,
  MongoCreatedAtSchema,
  MongoUpdatedAtSchema,
  ObjectIdSchema
} from './common.schema.js'

// Main Zod schema

export const IslandDataSchema = z.object({
  __v: MongoVersionSchema,
  createdAt: MongoCreatedAtSchema,
  updatedAt: MongoUpdatedAtSchema,

  _id: ObjectIdSchema.meta({
    description: 'Island document ID',
    example: '68bc452af0a9414a4312e589'
  }),

  name: z
    .string()
    .max(40)
    .meta({
      description: 'Island name',
      example: 'Luzon'
    })
})
  .meta({
    id: 'Island',
    description: 'Island schema'
  })

// Zod filters for API query
export const IslandApiSchema = IslandDataSchema.pick({
  name: true
}).extend({
  includeMeta: BooleanValueSchema
})
  .partial()
  .strict()

export type TIslandData = z.infer<typeof IslandDataSchema>
