import { z } from 'zod'
import { Types } from '@/types/types.js'
import { objectIdSchema } from './common.schema.js'
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
/*
export const ProvinceApiSchema = z.object({
  regionId: objectIdSchema.optional(),
  includeMeta: z.string().optional()
}).strict()

export const ProvinceApiFullSchema = z.object({
  regionId: objectIdSchema,
  includeMeta: z.string().optional()
}).strict()
*/

export const ProvinceApiSchema = ProvinceDataSchema.pick({
  regionId: true,
}).extend({
  regionId: objectIdSchema.optional(),
  includeMeta: z.string().optional()
}).strict()

export const ProvinceApiFullSchema = ProvinceDataSchema.pick({
  regionId: true,
}).extend({
  regionId: objectIdSchema,
  includeMeta: z.string().optional()
}).strict()

export type TProvinceData = z.infer<typeof ProvinceDataSchema>
