import { z } from 'zod'

import {
  BooleanValueSchema,
  MongoVersionSchema,
  MongoCreatedAtSchema,
  MongoUpdatedAtSchema,
  ObjectIdSchema
} from './common.schema.js'

// Zod schemas for query parameters

export const MunicipalityDataSchema = z.object({
  __v: MongoVersionSchema,
  createdAt: MongoCreatedAtSchema,
  updatedAt: MongoUpdatedAtSchema,

  _id: ObjectIdSchema.meta({
    description: 'Municipality ID',
    example: '68bc452bf0a9414a4312e753'
  }),

  regionId: ObjectIdSchema.meta({
    description: 'Region ID',
    example: '68bc452bf0a9414a4312e591'
  }),

  provinceId: ObjectIdSchema.meta({
    description: 'Province ID',
    example: '68bc452bf0a9414a4312e5b1'
  }),

  name: z
    .string()
    .max(40)
    .meta({
      description: 'Municipality name',
      example: 'Agoncillo'
    }),

  numDocs: z
    .number()
    .meta({
      description: 'Random number',
      example: 0
    })
})

export const MunicipalityApiSchema = MunicipalityDataSchema.pick({
  regionId: true,
  provinceId: true,
  name: true
}).extend({
  includeMeta: BooleanValueSchema
})
  .partial()
  .strict()

export type TMunicipality = z.infer<typeof MunicipalityDataSchema>
