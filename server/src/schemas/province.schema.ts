import { z } from 'zod'
import { Types } from '@/types/types.js'
import { BooleanValueSchema, ObjectIdSchema } from './common.schema.js'
import { MunicipalityDataSchema } from './municipality.schema.js'

// Zod schemas for query parameters

export const ProvinceDataSchema = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  regionId: z.instanceof(Types.ObjectId).or(z.string()),
  name: z.string().max(40),
  municipalities: z.array(MunicipalityDataSchema).optional()
})

export const ProvinceApiSchema = ProvinceDataSchema.pick({
  regionId: true
}).extend({
  regionId: ObjectIdSchema.optional(),
  includeMeta: z.string().optional()
}).strict()

export const ProvinceApiFullSchema = ProvinceDataSchema.pick({
  regionId: true
}).extend({
  regionId: ObjectIdSchema,
  includeMeta: BooleanValueSchema
}).strict()

export type TProvinceData = z.infer<typeof ProvinceDataSchema>
