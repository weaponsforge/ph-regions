import { z } from 'zod'
import { MunicipalityDataSchema } from './municipality.schema.js'

import {
  BooleanValueSchema,
  MongoVersionSchema,
  MongoCreatedAtSchema,
  MongoUpdatedAtSchema,
  ObjectIdSchema
} from './common.schema.js'

// Zod schemas for query parameters

export const ProvinceDataSchema = z.object({
  __v: MongoVersionSchema,
  createdAt: MongoCreatedAtSchema,
  updatedAt: MongoUpdatedAtSchema,

  _id: ObjectIdSchema.meta({
    description: 'Province ID',
    example: '68bc452bf0a9414a4312e5b1'
  }),

  regionId: ObjectIdSchema.meta({
    description: 'Region ID',
    example: '68bc452bf0a9414a4312e591'
  }),

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
    .meta({
      description: 'Municipalities under a province'
    })
})

export const ProvinceApiSchema = ProvinceDataSchema.pick({
  regionId: true
}).extend({
  includeMeta: BooleanValueSchema
})
  .partial()
  .strict()

export type TProvinceData = z.infer<typeof ProvinceDataSchema>
