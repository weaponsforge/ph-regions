import { z } from 'zod'
import { ObjectIdSchema } from './common.schema.js'

/** Zod schema for default MongoDB document fields */
export const MongoDocsDefault = z.object({
  _id: ObjectIdSchema,

  // Zod schema for the Mongo "__v" field
  __v: z
    .number()
    .optional()
    .meta({
      description: 'Mongoose version key',
      example: 0,
    }),

  // Zod schema for the Mongo "createdAt" field
  createdAt: z
    .date()
    .optional()
    .meta({
      description: 'MongoDB document creation date',
      example: '2025-09-06T14:28:58.985Z',
    }),

  // Zod schema for the Mongo "updatedAt" field
  updatedAt: z
    .date()
    .optional()
    .meta({
      description: 'MongoDB document last update/edit date',
      example: '2025-09-06T14:28:58.985Z',
    }),
})
