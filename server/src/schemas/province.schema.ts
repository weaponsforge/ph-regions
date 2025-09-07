import { z } from 'zod'

import { BooleanValueSchema, ObjectIdSchema } from './common.schema.js'
import { MongoDocsDefault } from './mongodoc.schema.js'
import { MunicipalityDataSchema, MunicipalityDocSchema } from './municipality.schema.js'

import { Types } from '@/types/types.js'

// Main Zod schema

export const ProvinceDataSchema = MongoDocsDefault.extend({
  _id: ObjectIdSchema.meta({
    description: 'Province ID',
    example: '68bc452bf0a9414a4312e5b1'
  }),

  regionId: z.instanceof(Types.ObjectId).or(ObjectIdSchema),

  name: z
    .string()
    .max(40)
    .meta({
      description: 'Province name',
      example: 'Batangas'
    }),

  municipalities: z
    .array(MunicipalityDataSchema)
    .optional()
})

// Zod ID definitions for OpenAPI docs (accepts string instead of ObjectId)
export const ProvinceDocSchema = ProvinceDataSchema.extend({
  includeMeta: BooleanValueSchema,

  regionId: ObjectIdSchema.meta({
    description: 'Region ID',
    example: '68bc452bf0a9414a4312e591'
  }),

  municipalities: z
    .array(MunicipalityDocSchema)
    .optional()
    .meta({
      description: 'Municipalities under this province'
    })
})

// Zod filters for API query
export const ProvinceApiSchema = ProvinceDataSchema.pick({
  regionId: true
}).extend({
  includeMeta: BooleanValueSchema
})
  .partial()
  .strict()

export type TProvinceData = z.infer<typeof ProvinceDataSchema>
