import { z } from 'zod'
import { objectIdSchema } from './common.schema.js'
import { ProvinceDataSchema } from './province.schema.js'

// Zod schemas for query parameters

export const RegionDataSchema = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  name: z.string().max(40),
  abbrev: z.string().max(20).nullable(),
  regionalName: z.string().optional(),
  regionalCode: z.string().max(5).nullable(),
  provinces: z.array(ProvinceDataSchema).max(40).optional()
})
/*
export const RegionApiSchema = z.object({
  _id: objectIdSchema.optional(),
  name: z.string().max(40).optional(),
  abbrev: z.string().max(20).optional(),
  regionalName: z.string().optional(),
  regionalCode: z.string().max(5).optional(),
  includeMeta: z.string().optional(),
}).strict()
*/
export const RegionApiSchema = RegionDataSchema.pick({
  _id: true,
  name: true,
  abbrev: true,
  regionalName: true,
  regionalCode: true
}).extend({
  _id: objectIdSchema.optional(),
  includeMeta: z.string().optional(),
}).strict()

export type TRegionData = z.infer<typeof RegionDataSchema>
