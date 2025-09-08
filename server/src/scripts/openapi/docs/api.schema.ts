import { z } from 'zod'

import { MunicipalityDocSchema } from '@/schemas/municipality.schema.js'
import { ProvinceDocSchema } from '@/schemas/province.schema.js'
import { RegionDocSchema } from '@/schemas/region.schema.js'

import { buildQuerySchema, omitCommonFields } from '@/utils/helpers.js'
import { IslandDocSchema } from '@/schemas/island.schema.js'
import { StatsDocSchema } from '@/schemas/stats.schema.js'

/**
 * -----------------------------------------------------------------
 * Response schemas for API documentation
 * These schemas exclude internal database fields for cleaner API responses
 */

// Base municipality response schema
export const MunicipalityResponseSchema = omitCommonFields(MunicipalityDocSchema)

// Province response schema with nested municipalities
export const ProvinceResponseSchema = omitCommonFields(ProvinceDocSchema)
  .extend({
    municipalities: z
      .array(MunicipalityResponseSchema)
      .optional()
  })

// Region response schema with nested provinces
export const RegionResponseSchema = omitCommonFields(RegionDocSchema)
  .extend({
    provinces: z
      .array(ProvinceResponseSchema)
      .optional()
  })

// Island response schema with nested regions and provinces
export const IslandResponseSchema = omitCommonFields(IslandDocSchema)
  .extend({
    regions: z
      .array(RegionResponseSchema.omit({ provinces: true }))
      .optional()
  })

// Base stats response schema
export const StatsResponseSchema = omitCommonFields(StatsDocSchema)

/**
 * -----------------------------------------------------------------
 * Query schemas for API documentation and middleware validation
 * These schemas are used for request validation (ex)
 */

// Island query schema for filtering/querying islands
export const IslandQuerySchema =
  buildQuerySchema(IslandDocSchema, ['_id', 'regions'])

// Region query schema for filtering/querying regions
export const RegionQuerySchema =
  buildQuerySchema(RegionDocSchema, ['_id', 'provinces'])

// Province query schema for filtering/querying provinces
export const ProvinceQuerySchema =
  buildQuerySchema(ProvinceDocSchema, ['_id', 'name', 'municipalities'])

// Municipality query schema for filtering/querying municipalities
export const MunicipalityQuerySchema =
  buildQuerySchema(MunicipalityDocSchema, ['_id', 'numDocs', 'name'])

// Stats query schema for filtering/querying stats
export const StatsQuerySchema =
  buildQuerySchema(StatsDocSchema, ['_id', 'municipalityId', 'numBrgy'])
