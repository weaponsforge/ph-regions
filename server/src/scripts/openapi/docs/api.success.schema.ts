import { z } from 'zod'

/** Zod fields under the `ResponseSuccessSchema.meta` */
export const RESPONSE_SUCCESS_META = {
  description: z
    .string()
    .meta({
      description: 'Summary describing the data set',
      example: 'List of main island groups in the Philippines'
    }),

  source: z
    .string()
    .meta({
      description: 'Data source description',
      example: 'ChatGPT'
    }),

  dateCreated: z
    .string()
    .meta({
      description: 'Date the data set was originally fetched from source(s) in YYYY/MM/DD format',
      example: '2025/09/07'
    })
}

/** API success response schema */
export const ResponseSuccessSchema = z.object({
  success: z
    .boolean()
    .default(true)
    .meta({
      description: 'Server query success flag'
    }),

  total: z
    .number()
    .meta({
      description: 'Total number of items in the `data[]` array',
      example: 1
    }),

  metadata: z.object(RESPONSE_SUCCESS_META)
})
  .meta({
    description: 'Successful response with requested data'
  })
