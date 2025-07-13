import { z } from 'zod'

// Zod schemas that mirror Mongoose models

export const MunicipalityDataSchema = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  regionId: z.string(),
  provinceId: z.string(),
  name: z.string().max(40),
  numDocs: z.number()
})

export const ProvinceDataSchema = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  regionId: z.string(),
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

export type TRegionData = z.infer<typeof RegionDataSchema>
export type TProvinceData = z.infer<typeof ProvinceDataSchema>
export type TMunicipality = z.infer<typeof MunicipalityDataSchema>
