
import { z } from 'zod'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { ResponseErrorSchema } from './api.error.schema.js'
import { RESPONSE_SUCCESS_META, ResponseSuccessSchema } from './api.success.schema.js'

import { StatsQuerySchema, StatsResponseSchema } from './api.schema.js'
import { StatsDocSchema } from '@/schemas/stats.schema.js'
import { FULL_API_METADATA } from '@/utils/constants.js'

/**
 * Builds the Stats - OpenAPI docs.
 * @param {OpenAPIRegistry} registry OpenAPIRegistry instance from the calling method
 */
export const buildStatsDocs = (registry: OpenAPIRegistry) => {
  const ResponseSuccessObject = ResponseSuccessSchema
    .omit({ total: true })
    .extend({
      metadata: z.object({
        description: RESPONSE_SUCCESS_META.description.meta({
          example: 'Random barangay geographic location data of the Philippines'
        }),
        source: RESPONSE_SUCCESS_META.source.meta({
          example: 'n/a'
        }),
        dateCreated: RESPONSE_SUCCESS_META.dateCreated.meta({
          example: FULL_API_METADATA.dateCreated
        })
      })
    })

  // API route: /stats/{id}
  const StatsDetailResponseSchema =
    ResponseSuccessObject
      .extend({
        data: StatsResponseSchema
      })

  registry.registerPath({
    method: 'get',
    path: '/api/stats/{id}',
    description: 'Retrieves municipality stats data by ID',
    summary: 'Get municipality stats by ID',
    tags: ['Stats'],
    request: {
      params: z.object({
        id: StatsDocSchema.shape.municipalityId
      }),
      query: z.object({
        includeMeta: StatsQuerySchema.shape.includeMeta
      })
    },
    responses: {
      200: {
        description: 'Object containing one (1) random Philippine municipality stat data',
        content: {
          'application/json': {
            schema: StatsDetailResponseSchema
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
      404: {
        description: 'Stats data for municipality not found',
        content: {
          'application/json': {
            schema: ResponseErrorSchema.extend({
              message: z
                .array(z.string())
                .meta({
                  description: 'List of error messages',
                  example: ['Municipality stats not found']
                })
            })
          }
        }
      }
    }
  })
}
