
import { z } from 'zod'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { IslandDataSchema, IslandApiSchema } from '@/schemas/island.schema.js'
import { RegionDocSchema } from '@/schemas/region.schema.js'
import { ResponseErrorSchema } from './api.error.schema.js'
import { ResponseSuccessSchema } from './api.success.schema.js'

/**
 * Builds the Islands - OpenAPI docs.
 * @param {OpenAPIRegistry} registry OpenAPIRegistry instance from the calling method
 */
export const buildIslandDocs = (registry: OpenAPIRegistry) => {
  // API route: /islands
  const IslandsApiSchema = ResponseSuccessSchema
    .extend({
      data: z.array(IslandDataSchema.omit({
        __v: true,
        createdAt: true,
        updatedAt: true
      }))
    })


  registry.registerPath({
    method: 'get',
    path: '/api/islands',
    description: 'List of main island group names in the Philippines',
    summary: 'Get island names',
    tags: ['Islands'],
    request: {
      query: z.object({
        name: IslandApiSchema.shape.name,
        includeMeta: IslandApiSchema.shape.includeMeta
      })
    },
    responses: {
      200: {
        description: 'Object with Philippine main island group names',
        content: {
          'application/json': {
            schema: IslandsApiSchema
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
  const IslandsFullApiSchema = ResponseSuccessSchema
    .extend({
      data: z.array(IslandDataSchema
        .omit({
          __v: true,
          createdAt: true,
          updatedAt: true
        })
        .extend({
          regions: z.array(RegionDocSchema
            .omit({
              __v: true,
              createdAt: true,
              updatedAt: true,
              provinces: true
            })
          )
        })
      )
    })

  registry.registerPath({
    method: 'get',
    path: '/api/islands/full',
    description: 'Full list of main island groups in the Philippines including regions',
    summary: 'Get full islands data with regions data',
    tags: ['Islands'],
    request: {
      query: z.object({
        name: IslandApiSchema.shape.name,
        includeMeta: IslandApiSchema.shape.includeMeta
      })
    },
    responses: {
      200: {
        description: 'Object contaning Philippine main island groups including regions',
        content: {
          'application/json': {
            schema: IslandsFullApiSchema
          }
        }
      }
    }
  })

  // API route: /islands/{id}
  const IslandsIDApiSchema = ResponseSuccessSchema
    .extend({
      data: z.array(IslandDataSchema
        .omit({
          __v: true,
          createdAt: true,
          updatedAt: true
        })
      )
    })

  registry.registerPath({
    method: 'get',
    path: '/api/islands/{id}',
    description: 'Get an island data by ID',
    summary: 'Get island data by ID',
    tags: ['Islands'],
    request: {
      params: z.object({
        id: IslandDataSchema.shape._id
      }),
      query: z.object({
        includeMeta: IslandApiSchema.shape.includeMeta
      })
    },
    responses: {
      200: {
        description: 'Object contaning Philippine main island groups including regions',
        content: {
          'application/json': {
            schema: IslandsIDApiSchema
          }
        }
      }
    }
  })
}
