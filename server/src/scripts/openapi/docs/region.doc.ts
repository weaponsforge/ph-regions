
import { z } from 'zod'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { RegionDocSchema } from '@/schemas/region.schema.js'
import { ResponseErrorSchema } from './api.error.schema.js'
import { ResponseSuccessSchema } from './api.success.schema.js'

import { RegionResponseSchema, RegionQuerySchema } from './api.schema.js'

/**
 * Builds the Regions - OpenAPI docs.
 * @param {OpenAPIRegistry} registry OpenAPIRegistry instance from the calling method
 */
export const buildRegionDocs = (registry: OpenAPIRegistry) => {
  // API route: /regions
  const RegionListResponseSchema =
    ResponseSuccessSchema
      .extend({
        data: z.array(RegionResponseSchema.omit({ provinces: true }))
      })

  registry.registerPath({
    method: 'get',
    path: '/api/regions',
    description: 'List of region names in the Philippines',
    summary: 'Get region names',
    tags: ['Regions'],
    request: {
      query: RegionQuerySchema.partial()
    },
    responses: {
      200: {
        description: 'Object with Philippine region names',
        content: {
          'application/json': {
            schema: RegionListResponseSchema
          }
        }
      },
      400: {
        description: 'Query parameter validation error',
        content: {
          'application/json': {
            schema: ResponseErrorSchema
          }
        }
      }
    }
  })

  // API route: /regions/full
  const RegionListFullResponseSchema =
    ResponseSuccessSchema
      .extend({
        data: z.array(RegionResponseSchema)
      })

  registry.registerPath({
    method: 'get',
    path: '/api/regions/full',
    description: 'Full list of regions in the Philippines including provinces and municipalities',
    summary: 'Get full regions data with provinces and municipalities data',
    tags: ['Regions'],
    request: {
      query: RegionQuerySchema.partial()
    },
    responses: {
      200: {
        description: 'Object contaning Philippine regions including provinces and municipalities',
        content: {
          'application/json': {
            schema: RegionListFullResponseSchema
          }
        }
      }
    }
  })

  // API route: /regions/{id}
  const RegionDetailResponseSchema =
    ResponseSuccessSchema
      .extend({
        data: RegionResponseSchema.omit({ provinces: true })
      })

  registry.registerPath({
    method: 'get',
    path: '/api/regions/{id}',
    description: 'Get region data by ID excluding provinces and municipalities',
    summary: 'Get region data by ID',
    tags: ['Regions'],
    request: {
      params: z.object({
        id: RegionDocSchema.shape._id
      }),
      query: z.object({
        includeMeta: RegionDocSchema.shape.includeMeta
      })
    },
    responses: {
      200: {
        description: 'Object contaning one (1) Philippine region data excluding provinces and municipalities',
        content: {
          'application/json': {
            schema: RegionDetailResponseSchema
          }
        }
      }
    }
  })

  // API route: /regions/{id}/provinces
  const RegionDetailFullResponseSchema =
    ResponseSuccessSchema
      .extend({ data: RegionResponseSchema })

  registry.registerPath({
    method: 'get',
    path: '/api/regions/{id}/provinces',
    description: 'Get region data by ID including all provinces and municipalities',
    summary: 'Get region data by ID with and municipalities',
    tags: ['Regions'],
    request: {
      params: z.object({
        id: RegionDocSchema.shape._id
      }),
      query: z.object({
        includeMeta: RegionDocSchema.shape.includeMeta
      })
    },
    responses: {
      200: {
        description: 'Object contaning a Philippine region data including provinces and municipalities',
        content: {
          'application/json': {
            schema: RegionDetailFullResponseSchema
          }
        }
      }
    }
  })
}
