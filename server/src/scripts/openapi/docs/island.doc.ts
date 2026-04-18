import { z } from 'zod'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { ResponseErrorSchema } from './api.error.schema.js'
import { RESPONSE_SUCCESS_META, ResponseSuccessSchema } from './api.success.schema.js'

import { IslandQuerySchema, IslandResponseSchema } from './api.schema.js'
import { IslandDocSchema } from '@/schemas/island.schema.js'
import { FULL_API_METADATA } from '@/utils/constants.js'

/**
 * Builds the Islands - OpenAPI docs.
 * @param {OpenAPIRegistry} registry OpenAPIRegistry instance from the calling method
 */
export const buildIslandDocs = (registry: OpenAPIRegistry) => {
  const IslandResponseSuccessSchema = ResponseSuccessSchema.extend({
    metadata: z.object({
      description: RESPONSE_SUCCESS_META.description.meta({
        example: 'Main Island groups geographic location data of the Philippines',
      }),
      source: RESPONSE_SUCCESS_META.source.meta({
        example: FULL_API_METADATA.source,
      }),
      dateCreated: RESPONSE_SUCCESS_META.dateCreated.meta({
        example: FULL_API_METADATA.dateCreated,
      }),
    }),
  })

  // Schema for 404 not found error response
  const IslandNotFoundErrorSchema = {
    description: 'Island not found error',
    content: {
      'application/json': {
        schema: ResponseErrorSchema.extend({
          status: ResponseErrorSchema.shape.status.meta({ example: 404 }),
          message: z
            .array(z.string())
            .meta({
              description: 'List of error messages',
              example: ['Island not found'],
            }),
        }),
      },
    },
  }

  // API route: /islands
  const IslandListResponseSchema =
    IslandResponseSuccessSchema
      .extend({
        data: z.array(IslandResponseSchema.omit({ regions: true })),
      })

  registry.registerPath({
    method: 'get',
    path: '/api/islands',
    description: 'List of main island group names in the Philippines',
    summary: 'List islands',
    tags: ['Islands'],
    request: {
      query: IslandQuerySchema,
    },
    responses: {
      200: {
        description: 'Object with Philippine main island group names',
        content: {
          'application/json': {
            schema: IslandListResponseSchema,
          },
        },
      },
      400: {
        description: 'Query parameter validation error',
        content: {
          'application/json': {
            schema: ResponseErrorSchema,
          },
        },
      },
    },
  })

  // API route: /islands/full
  const IslandListFullResponseSchema =
    IslandResponseSuccessSchema
      .extend({
        data: z.array(IslandResponseSchema),
      })

  registry.registerPath({
    method: 'get',
    path: '/api/islands/full',
    description: 'Full list of main island groups in the Philippines including regions',
    summary: 'List full islands',
    tags: ['Islands'],
    request: {
      query: IslandQuerySchema,
    },
    responses: {
      200: {
        description: 'Object containing Philippine main island groups including regions',
        content: {
          'application/json': {
            schema: IslandListFullResponseSchema,
          },
        },
      },
      400: {
        description: 'Query parameter validation error',
        content: {
          'application/json': {
            schema: ResponseErrorSchema,
          },
        },
      },
    },
  })

  // API route: /islands/{id}
  const IslandDetailResponseSchema =
    IslandResponseSuccessSchema
      .extend({
        data: IslandResponseSchema.omit({ regions: true }),
      })

  registry.registerPath({
    method: 'get',
    path: '/api/islands/{id}',
    description: 'Get an island data by ID',
    summary: 'Get island by ID',
    tags: ['Islands'],
    request: {
      params: z.object({
        id: IslandDocSchema.shape._id,
      }),
      query: z.object({
        includeMeta: IslandQuerySchema.shape.includeMeta,
      }),
    },
    responses: {
      200: {
        description: 'Object containing Philippine main island groups including regions',
        content: {
          'application/json': {
            schema: IslandDetailResponseSchema,
          },
        },
      },
      400: {
        description: 'Query parameter validation error',
        content: {
          'application/json': {
            schema: ResponseErrorSchema,
          },
        },
      },
      404: IslandNotFoundErrorSchema,
    },
  })
}
