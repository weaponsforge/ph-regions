
import { z } from 'zod'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { IslandDocSchema } from '@/schemas/island.schema.js'
import { ResponseErrorSchema } from './api.error.schema.js'
import { ResponseSuccessSchema } from './api.success.schema.js'
import { IslandQuerySchema, IslandResponseSchema } from './api.schema.js'

/**
 * Builds the Islands - OpenAPI docs.
 * @param {OpenAPIRegistry} registry OpenAPIRegistry instance from the calling method
 */
export const buildIslandDocs = (registry: OpenAPIRegistry) => {
  // API route: /islands
  const IslandListResponseSchema = ResponseSuccessSchema
    .extend({
      data: z.array(IslandResponseSchema.omit({ regions: true }))
    })

  registry.registerPath({
    method: 'get',
    path: '/api/islands',
    description: 'List of main island group names in the Philippines',
    summary: 'Get island names',
    tags: ['Islands'],
    request: {
      query: IslandQuerySchema
    },
    responses: {
      200: {
        description: 'Object with Philippine main island group names',
        content: {
          'application/json': {
            schema: IslandListResponseSchema
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

  // API route: /islands/full
  const IslandListFullResponseSchema = ResponseSuccessSchema
    .extend({
      data: z.array(IslandResponseSchema)
    })

  registry.registerPath({
    method: 'get',
    path: '/api/islands/full',
    description: 'Full list of main island groups in the Philippines including regions',
    summary: 'Get full islands data with regions data',
    tags: ['Islands'],
    request: {
      query: IslandQuerySchema
    },
    responses: {
      200: {
        description: 'Object contaning Philippine main island groups including regions',
        content: {
          'application/json': {
            schema: IslandListFullResponseSchema
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

  // API route: /islands/{id}
  const IslandDetailResponseSchema =
    ResponseSuccessSchema
      .extend({
        data: IslandResponseSchema.omit({ regions: true })
      })

  registry.registerPath({
    method: 'get',
    path: '/api/islands/{id}',
    description: 'Get an island data by ID',
    summary: 'Get island data by ID',
    tags: ['Islands'],
    request: {
      params: z.object({
        id: IslandDocSchema.shape._id
      }),
      query: z.object({
        includeMeta: IslandDocSchema.shape.includeMeta
      })
    },
    responses: {
      200: {
        description: 'Object contaning Philippine main island groups including regions',
        content: {
          'application/json': {
            schema: IslandDetailResponseSchema
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
}
