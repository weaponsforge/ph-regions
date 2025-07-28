import { z } from 'zod'
import { Types } from '@/types/types.js'
import { ObjectIdSchema, BooleanValueSchema } from './common.schema.js'

// Zod schemas for query parameters

export const MunicipalityDataSchema = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  regionId: z.instanceof(Types.ObjectId).or(z.string()),
  provinceId: z.instanceof(Types.ObjectId).or(z.string()),
  name: z.string().max(40),
  numDocs: z.number()
})

export const MunicipalityApiSchema = MunicipalityDataSchema.pick({
  regionId: true,
  provinceId: true,
  name: true
}).extend({
  regionId: ObjectIdSchema,
  provinceId: ObjectIdSchema,
  includeMeta: BooleanValueSchema
})
  .partial()
  .strict()

export type TMunicipality = z.infer<typeof MunicipalityDataSchema>
