import { z } from 'zod'
import { Types } from '@/types/types.js'

import { BooleanValueSchema, ObjectIdSchema } from './common.schema.js'
import { MongoDocsDefault } from './mongodoc.schema.js'

// Main Zod schema

export const MunicipalityDataSchema = MongoDocsDefault.extend({
  _id: ObjectIdSchema.meta({
    description: 'Municipality ID',
    example: '68bc452bf0a9414a4312e753'
  }),

  regionId: z.instanceof(Types.ObjectId).or(ObjectIdSchema),
  provinceId: z.instanceof(Types.ObjectId).or(ObjectIdSchema),

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

// Zod ID definitions for OpenAPI docs
export const MunicipalityDocSchema = MunicipalityDataSchema.extend({
  includeMeta: BooleanValueSchema,

  regionId: ObjectIdSchema.meta({
    description: 'Region ID',
    example: '68bc452bf0a9414a4312e591'
  }),

  provinceId: ObjectIdSchema.meta({
    description: 'Province ID',
    example: '68bc452bf0a9414a4312e5b1'
  })
})

// Zod filters for API query
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
