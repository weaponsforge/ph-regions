import { z } from 'zod'

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
      example: 3
    }),

  metadata: z.object({
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
        description: 'Date the data set was created in YYYY/MM/DD format',
        example: '2025/09/07'
      })
  })
})
  .meta({
    description: 'Successful response with requested data'
  })
