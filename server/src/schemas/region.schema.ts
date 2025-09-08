import { z } from 'zod'
import { ProvinceDataSchema, ProvinceDocSchema } from './province.schema.js'

import { ObjectIdSchema } from './common.schema.js'
import { MongoDocsDefault } from './mongodoc.schema.js'

import { Types } from '@/types/types.js'

// Main Zod schema

export const RegionDataSchema = MongoDocsDefault.extend({
  _id: ObjectIdSchema.meta({
    description: 'Region ID',
    example: '68bc452bf0a9414a4312e591'
  }),

  islandId: z.instanceof(Types.ObjectId).or(ObjectIdSchema),

  name: z
    .string()
    .max(40)
    .trim()
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
})

// Zod ID definitions for OpenAPI docs (accepts string instead of ObjectId)
export const RegionDocSchema = RegionDataSchema.extend({
  // includeMeta: BooleanValueSchema,

  islandId: ObjectIdSchema.meta({
    description: 'Island document ID',
    example: '68bc452af0a9414a4312e589'
  }),

  provinces: z
    .array(ProvinceDocSchema)
    .max(40)
    .optional()
    .meta({
      description: 'Provinces under this region'
    })
})

export type TRegionData = z.infer<typeof RegionDataSchema>
