import { z } from 'zod'

import { ObjectIdSchema } from './common.schema.js'
import { MongoDocsDefault } from './mongodoc.schema.js'
import { RegionDocSchema } from './region.schema.js'

// Main Zod schema

export const IslandDataSchema = MongoDocsDefault.extend({
  _id: ObjectIdSchema.meta({
    description: 'Island document ID',
    example: '68bc452af0a9414a4312e589'
  }),

  name: z
    .string()
    .max(40)
    .trim()
    .meta({
      description: 'Island name',
      example: 'Luzon'
    })
})
  .meta({
    id: 'Island',
    description: 'Island schema'
  })

// Zod ID definitions for OpenAPI docs
export const IslandDocSchema = IslandDataSchema.extend({
  // includeMeta: BooleanValueSchema,

  regions: z
    .array(RegionDocSchema)
    .max(40)
    .optional()
    .meta({
      description: 'Regions under this island'
    })
})

export type TIslandData = z.infer<typeof IslandDataSchema>
