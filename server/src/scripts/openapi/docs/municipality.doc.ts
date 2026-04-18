import { z } from 'zod'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { ResponseErrorSchema } from './api.error.schema.js'
import { RESPONSE_SUCCESS_META, ResponseSuccessSchema } from './api.success.schema.js'

import { MunicipalityResponseSchema, MunicipalityQuerySchema } from './api.schema.js'
import { MunicipalityDocSchema } from '@/schemas/municipality.schema.js'
import { FULL_API_METADATA } from '@/utils/constants.js'

/**
 * Builds the Municipalities - OpenAPI docs.
 * @param {OpenAPIRegistry} registry OpenAPIRegistry instance from the calling method
 */
export const buildMunicipalityDocs = (registry: OpenAPIRegistry) => {
  const ResponseSuccessObject = ResponseSuccessSchema.extend({
    metadata: z.object({
      description: RESPONSE_SUCCESS_META.description.meta({
        example: 'Municipal geographic location data of the Philippines',
      }),
      source: RESPONSE_SUCCESS_META.source.meta({
        example: FULL_API_METADATA.source,
      }),
      dateCreated: RESPONSE_SUCCESS_META.dateCreated.meta({
        example: FULL_API_METADATA.dateCreated,
      }),
    }),
  })

  // API route: /municipalities
  const MunicipalityListResponseSchema =
    ResponseSuccessObject
      .extend({
        data: z.array(MunicipalityResponseSchema),
      })

  registry.registerPath({
    method: 'get',
    path: '/api/municipalities',
    description: 'List of municipalities in the Philippines by region or province',
    summary: 'List municipalities',
    tags: ['Municipalities'],
    request: {
      query: MunicipalityQuerySchema,
    },
    responses: {
      200: {
        description: 'Object containing a list of Philippine municipalities',
        content: {
          'application/json': {
            schema: MunicipalityListResponseSchema,
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

  // API route: /municipalities/{id}
  const MunicipalityDetailResponseSchema =
    ResponseSuccessObject
      .extend({
        data: MunicipalityResponseSchema,
      })

  registry.registerPath({
    method: 'get',
    path: '/api/municipalities/{id}',
    description: 'Retrieves municipality data by ID',
    summary: 'Get municipality by ID',
    tags: ['Municipalities'],
    request: {
      params: z.object({
        id: MunicipalityDocSchema.shape._id,
      }),
      query: z.object({
        includeMeta: MunicipalityQuerySchema.shape.includeMeta,
      }),
    },
    responses: {
      200: {
        description: 'Object containing one (1) Philippine municipality data',
        content: {
          'application/json': {
            schema: MunicipalityDetailResponseSchema,
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
      404: {
        description: 'Municipality data not found',
        content: {
          'application/json': {
            schema: ResponseErrorSchema.extend({
              status: ResponseErrorSchema.shape.status.meta({ example: 404 }),
              message: z
                .array(z.string())
                .meta({
                  description: 'List of error messages',
                  example: ['Municipality not found'],
                }),
            }),
          },
        },
      },
    },
  })
}
