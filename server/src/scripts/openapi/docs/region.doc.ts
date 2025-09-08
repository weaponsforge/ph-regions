
import { z } from 'zod'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { RegionDocSchema } from '@/schemas/region.schema.js'
import { ResponseErrorSchema } from './api.error.schema.js'
import { RESPONSE_SUCCESS_META, ResponseSuccessSchema } from './api.success.schema.js'

import { RegionResponseSchema, RegionQuerySchema } from './api.schema.js'
import { FULL_API_METADATA } from '@/utils/constants.js'

/**
 * Builds the Regions - OpenAPI docs.
 * @param {OpenAPIRegistry} registry OpenAPIRegistry instance from the calling method
 */
export const buildRegionDocs = (registry: OpenAPIRegistry) => {
  const RegionResponseSuccessSchema = ResponseSuccessSchema.extend({
    metadata: z.object({
      description: RESPONSE_SUCCESS_META.description.meta({
        example: 'Regional geographic location data of the Philippines'
      }),
      source: RESPONSE_SUCCESS_META.source.meta({
        example: FULL_API_METADATA.source
      }),
      dateCreated: RESPONSE_SUCCESS_META.dateCreated.meta({
        example: FULL_API_METADATA.dateCreated
      })
    })
  })

  // Schema for 404 not found error response
  const RegionNotFoundErrorSchema = {
    description: 'Region not found error',
    content: {
      'application/json': {
        schema: ResponseErrorSchema.extend({
          status: ResponseErrorSchema.shape.status.meta({ example: 404 }),
          message: z
            .array(z.string())
            .meta({
              description: 'List of error messages',
              example: ['Region not found']
            })
        })
      }
    }
  }

  // API route: /regions
  const RegionListResponseSchema =
    RegionResponseSuccessSchema
      .extend({
        data: z.array(RegionResponseSchema.omit({ provinces: true }))
      })

  registry.registerPath({
    method: 'get',
    path: '/api/regions',
    description: 'List of regions in the Philippines (excluding provinces and municipalities)',
    summary: 'List regions',
    tags: ['Regions'],
    request: {
      query: RegionQuerySchema
    },
    responses: {
      200: {
        description: 'Object containing regions (without provinces/municipalities)',
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
    RegionResponseSuccessSchema
      .extend({
        data: z.array(RegionResponseSchema)
      })

  registry.registerPath({
    method: 'get',
    path: '/api/regions/full',
    description: 'Full list of regions data in the Philippines including provinces and municipalities',
    summary: 'List full regions',
    tags: ['Regions'],
    request: {
      query: RegionQuerySchema
    },
    responses: {
      200: {
        description: 'Object containing Philippine regions including provinces and municipalities',
        content: {
          'application/json': {
            schema: RegionListFullResponseSchema
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

  // API route: /regions/{id}
  const RegionDetailResponseSchema =
    RegionResponseSuccessSchema
      .extend({
        data: RegionResponseSchema.omit({ provinces: true })
      })

  registry.registerPath({
    method: 'get',
    path: '/api/regions/{id}',
    description: 'Retrieves region data by ID excluding provinces and municipalities',
    summary: 'Get region by ID',
    tags: ['Regions'],
    request: {
      params: z.object({
        id: RegionDocSchema.shape._id
      }),
      query: z.object({
        includeMeta: RegionQuerySchema.shape.includeMeta
      })
    },
    responses: {
      200: {
        description: 'Object containing one (1) Philippine region data excluding provinces and municipalities',
        content: {
          'application/json': {
            schema: RegionDetailResponseSchema
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
      },
      404: RegionNotFoundErrorSchema
    }
  })

  // API route: /regions/{id}/provinces
  const RegionDetailFullResponseSchema =
    RegionResponseSuccessSchema
      .extend({ data: RegionResponseSchema })

  registry.registerPath({
    method: 'get',
    path: '/api/regions/{id}/provinces',
    description: 'Retrieves region data by ID including all provinces and municipalities',
    summary: 'Get region by ID with provinces',
    tags: ['Regions'],
    request: {
      params: z.object({
        id: RegionDocSchema.shape._id
      }),
      query: z.object({
        includeMeta: RegionQuerySchema.shape.includeMeta
      })
    },
    responses: {
      200: {
        description: 'Object containing a Philippine region data including provinces and municipalities',
        content: {
          'application/json': {
            schema: RegionDetailFullResponseSchema
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
      },
      404: RegionNotFoundErrorSchema
    }
  })
}
