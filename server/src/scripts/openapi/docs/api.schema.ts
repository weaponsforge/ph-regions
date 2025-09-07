import { z } from 'zod'

import { MunicipalityDocSchema } from '@/schemas/municipality.schema.js'
import { ProvinceDocSchema } from '@/schemas/province.schema.js'
import { RegionDocSchema } from '@/schemas/region.schema.js'

import { omitCommonFields } from '@/utils/helpers.js'
import { IslandDocSchema } from '@/schemas/island.schema.js'
import { StatsDocSchema } from '@/schemas/stats.schema.js'

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

// Island response schema with nested regions and provinces
export const IslandResponseSchema = omitCommonFields(IslandDocSchema, ['includeMeta'])
  .extend({
    regions: z.array(RegionResponseSchema.omit({ provinces: true }))
  })

// Base stats response schema
export const StatsResponseSchema = omitCommonFields(StatsDocSchema, ['includeMeta'])

/**
 * -----------------------------------------------------------------
 * Query schemas for API documentation and middleware validation
 * These schemas are used for request validation (ex)
 */

// Island query schema for filtering/querying islads
export const IslandQuerySchema = omitCommonFields(IslandDocSchema, ['_id', 'regions'])
  .partial()
  .strict()

// Region query schema for filtering/querying regions
export const RegionQuerySchema = omitCommonFields(RegionDocSchema, ['_id', 'provinces'])
  .partial()
  .strict()

// Province query schema for filtering/querying provinces
export const ProvinceQuerySchema = omitCommonFields(ProvinceDocSchema, ['_id', 'name', 'municipalities'])
  .partial()
  .strict()

// Municipality query schema for filtering/querying municipalities
export const MunicipalityQuerySchema = omitCommonFields(MunicipalityDocSchema, ['_id', 'numDocs', 'name'])
  .partial()
  .strict()

// Stats query schema for filtering/querying stats
export const StatsQuerySchema = omitCommonFields(StatsDocSchema, ['_id', 'municipalityId', 'numBrgy'])
  .partial()
  .strict()
