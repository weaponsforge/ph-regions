import { z } from 'zod'

import { MunicipalityDocSchema } from '@/schemas/municipality.schema.js'
import { ProvinceDocSchema } from '@/schemas/province.schema.js'
import { RegionDocSchema } from '@/schemas/region.schema.js'

import { omitCommonFields } from '@/utils/helpers.js'

/**
 * -----------------------------------------------------------------
 * Response schemas for API documentation
 * These schemas exclude internal database fields for cleaner API responses
 */

// Base municipality response schema
export const MunicipalityResponseSchema = omitCommonFields(MunicipalityDocSchema, ['includeMeta'])

// Province response schema with nested municipalities
export const ProvinceResponseSchema = omitCommonFields(ProvinceDocSchema, ['includeMeta'])
  .extend({
    municipalities: z.array(MunicipalityResponseSchema)
  })

// Region response schema with nested provinces
export const RegionResponseSchema = omitCommonFields(RegionDocSchema, ['includeMeta'])
  .extend({
    provinces: z.array(ProvinceResponseSchema)
  })

/**
 * -----------------------------------------------------------------
 * Query schemas for API documentation
 * These schemas are used for request validation
 */

// Region query schema for filtering/querying regions
export const RegionQuerySchema = omitCommonFields(RegionDocSchema, ['_id', 'provinces'])
