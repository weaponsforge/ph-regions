
import { z } from 'zod'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { ResponseErrorSchema } from './api.error.schema.js'
import { RESPONSE_SUCCESS_META, ResponseSuccessSchema } from './api.success.schema.js'

import { ProvinceResponseSchema, ProvinceQuerySchema } from './api.schema.js'
import { ProvinceDocSchema } from '@/schemas/province.schema.js'
import { FULL_API_METADATA } from '@/utils/constants.js'

/**
 * Builds the Provinces - OpenAPI docs.
 * @param {OpenAPIRegistry} registry OpenAPIRegistry instance from the calling method
 */
export const buildProvinceDocs = (registry: OpenAPIRegistry) => {
  const ResponseSuccessObject = ResponseSuccessSchema.extend({
    metadata: z.object({
      description: RESPONSE_SUCCESS_META.description.meta({
        example: 'Provincial geographic location data of the Philippines'
      }),
      source: RESPONSE_SUCCESS_META.source.meta({
        example: FULL_API_METADATA.source
      }),
      dateCreated: RESPONSE_SUCCESS_META.dateCreated.meta({
        example: '2022/08/03'
      })
    })
  })

  // API route: /provinces
  const ProvinceListResponseSchema =
    ResponseSuccessObject
      .extend({
        data: z.array(ProvinceResponseSchema.omit({ municipalities: true }))
      })

  registry.registerPath({
    method: 'get',
    path: '/api/provinces',
    description: 'List of provinces in the Philippines including only province name',
    summary: 'Get province names',
    tags: ['Provinces'],
    request: {
      query: ProvinceQuerySchema
    },
    responses: {
      200: {
        description: 'Object containing a list of Philippine province names',
        content: {
          'application/json': {
            schema: ProvinceListResponseSchema
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

  // API route: /provinces/full
  const ProvinceListFullResponseSchema =
    ResponseSuccessObject
      .extend({
        data: z.array(ProvinceResponseSchema)
      })

  registry.registerPath({
    method: 'get',
    path: '/api/provinces/full',
    description: 'Full list of provinces in the Philippines including municipalities',
    summary: 'Get full provinces',
    tags: ['Provinces'],
    request: {
      query: ProvinceQuerySchema
    },
    responses: {
      200: {
        description: 'Object containing Philippine regions including provinces and municipalities',
        content: {
          'application/json': {
            schema: ProvinceListFullResponseSchema
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

  // API route: /provinces/{id}
  const ProvinceDetailResponseSchema =
    ResponseSuccessObject
      .extend({
        data: ProvinceResponseSchema.omit({ municipalities: true })
      })

  registry.registerPath({
    method: 'get',
    path: '/api/provinces/{id}',
    description: 'Get province data by ID excluding municipalities',
    summary: 'Get province by ID',
    tags: ['Provinces'],
    request: {
      params: z.object({
        id: ProvinceDocSchema.shape._id
      }),
      query: z.object({
        includeMeta: ProvinceDocSchema.shape.includeMeta
      })
    },
    responses: {
      200: {
        description: 'Object containing one (1) Philippine province data excluding municipalities',
        content: {
          'application/json': {
            schema: ProvinceDetailResponseSchema
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

  // API route: /provinces/{id}/municipalities
  const ProvinceDetailFullResponseSchema =
    ResponseSuccessObject
      .extend({ data: ProvinceResponseSchema })

  registry.registerPath({
    method: 'get',
    path: '/api/provinces/{id}/municipalities',
    description: 'Get province data by ID including its municipalities',
    summary: 'Get province by ID with municipalities',
    tags: ['Provinces'],
    request: {
      params: z.object({
        id: ProvinceDocSchema.shape._id
      }),
      query: z.object({
        includeMeta: ProvinceDocSchema.shape.includeMeta
      })
    },
    responses: {
      200: {
        description: 'Object containing a Philippine region data including provinces and municipalities',
        content: {
          'application/json': {
            schema: ProvinceDetailFullResponseSchema
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
