import { z } from 'zod'

/** API error response schema */
export const ResponseErrorSchema = z.object({
  success: z
    .boolean()
    .default(false)
    .meta({
      description: 'Server query failure flag'
    }),

  error: z
    .string()
    .meta({
      description: 'Common error message text',
      example: 'Validation Error'
    }),

  message: z
    .array(z.string())
    .meta({
      description: 'List of error messages',
      example: ['Unrecognized key: test']
    }),

  status: z
    .number()
    .meta({
      description: 'HTTP error status code',
      example: 400
    })
})
  .meta({
    description: 'Server error response information'
  })
