import { z } from 'zod'
import { Types } from '@/types/types.js'

// Zod schemas that mirror Mongoose models

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

export const ProvinceDataSchema = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  regionId: z.instanceof(Types.ObjectId).or(z.string()),
  name: z.string().max(40),
  municipalities: z.array(MunicipalityDataSchema).optional()
})

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

export const RegionListParams = z.object({
  isFormat: z.string().optional(),
  _id: z.string().optional(),
  regionId: z.string().optional(),
  provinceId: z.string().optional(),
  municipalityId: z.string().optional(),
  name: z.string().max(40).optional(),
  abbrev: z.string().max(20).optional(),
  regionalName: z.string().optional(),
  regionalCode: z.string().max(5).optional()
})

export type TRegionData = z.infer<typeof RegionDataSchema>
export type TProvinceData = z.infer<typeof ProvinceDataSchema>
export type TMunicipality = z.infer<typeof MunicipalityDataSchema>

export type TRegionListParams = z.infer<typeof RegionListParams>
