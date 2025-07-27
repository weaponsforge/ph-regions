import { z } from 'zod'
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

export const RegionApiSchema = RegionDataSchema.pick({
  name: true,
  abbrev: true,
  regionalName: true,
  regionalCode: true
})
  .partial()
  .strict()

export type TRegionData = z.infer<typeof RegionDataSchema>
