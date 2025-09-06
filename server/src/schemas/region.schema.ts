import { z } from 'zod'
import { ProvinceDataSchema } from './province.schema.js'

import {
  BooleanValueSchema,
  MongoVersionSchema,
  MongoCreatedAtSchema,
  MongoUpdatedAtSchema,
  ObjectIdSchema
} from './common.schema.js'

// Zod schemas for query parameters

export const RegionDataSchema = z.object({
  __v: MongoVersionSchema,
  createdAt: MongoCreatedAtSchema,
  updatedAt: MongoUpdatedAtSchema,

  _id: ObjectIdSchema.meta({
    description: 'Region ID',
    example: '68bc452bf0a9414a4312e591'
  }),

  islandId: ObjectIdSchema.meta({
    description: 'Island document ID',
    example: '68bc452af0a9414a4312e589'
  }),

  name: z
    .string()
    .max(40)
    .meta({
      description: 'Region name',
      example: 'Region IV-A'
    }),

  abbrev: z
    .string()
    .max(20)
    .nullable()
    .meta({
      description: 'Abbreviation name or code',
      example: 'CALABARZON'
    }),

  regionalName: z
    .string()
    .optional()
    .meta({
      description: 'Long-form regional name',
      example: 'CALABARZON'
    }),

  regionalCode: z
    .string()
    .max(5)
    .nullable()
    .meta({
      description: 'Region code',
      example: '4A'
    }),

  provinces: z
    .array(ProvinceDataSchema)
    .max(40)
    .optional()
    .meta({
      description: 'Provinces under this region'
    })
})
  .meta({
    id: 'Region',
    description: 'Philippine region object'
  })

export const RegionApiSchema = RegionDataSchema.pick({
  islandId: true,
  name: true,
  abbrev: true,
  regionalName: true,
  regionalCode: true
}).extend({
  includeMeta: BooleanValueSchema
})
  .partial()
  .strict()

export type TRegionData = z.infer<typeof RegionDataSchema>
