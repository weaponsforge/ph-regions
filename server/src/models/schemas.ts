import { z } from 'zod'

export const MunicipalityDataSchema = z.object({
  id: z.string().optional(),
  regionId: z.number(),
  provinceId: z.number(),
  municipalityId: z.number(),
  name: z.string(),
  numDocs: z.number()
})

export const ProvinceDataSchema = z.object({
  id: z.string().optional(),
  regionId: z.number(),
  provinceId: z.number(),
  name: z.string(),
  municipalities: z.array(MunicipalityDataSchema).optional()
})

export const RegionDataSchema = z.object({
  id: z.string().optional(),
  regionId: z.number(),
  name: z.string(),
  provinces: z.array(ProvinceDataSchema).optional()
})

export type TRegion = z.infer<typeof RegionDataSchema>
export type TProvince = z.infer<typeof ProvinceDataSchema>
export type TMunicipality = z.infer<typeof MunicipalityDataSchema>
