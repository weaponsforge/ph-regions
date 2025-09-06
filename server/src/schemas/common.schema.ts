import { z } from 'zod'
/** Zod schema for MongoDB ObjectIDs */
export const ObjectIdSchema = z
  .string()
  .refine(
    (val: string) => /^[0-9a-fA-F]{24}$/.test(val),
    { message: 'Invalid ID format' }
  )
  .meta({
    description: 'MongoDB document ID `_id`',
    example: '68bc452bf0a9414a4312e5a5'
  })

export const MongoIdSchema = z.object({
  id: ObjectIdSchema.optional()
})

/** Zod schema for boolean values from query */
export const BooleanValueSchema = z.preprocess(
  (val: string | undefined) => {
    if (val === undefined) return false
    if (typeof val === 'string') return val.toLowerCase() === 'true'
    return Boolean(val)
  },
  z.boolean().default(false)
).meta({
  description: 'Flag to include the Mongo meta fields (eg., createdAt, updatedAt) in the response',
  example: true
})
