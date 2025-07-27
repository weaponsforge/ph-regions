import { z } from 'zod'

/** Zod schema for MongoDB ObjectIDs */
export const objectIdSchema = z
  .string()
  .refine(
    (val: string) => /^[0-9a-fA-F]{24}$/.test(val),
    { message: 'Invalid ID format' }
  )

export const MongoIdSchema = z.object({
  id: objectIdSchema.optional()
})

export const BooleanValueSchema = z.preprocess(
  (val: string | undefined) => {
    if (val === undefined) return false
    if (typeof val === 'string') return val.toLowerCase() === 'true'
    return Boolean(val)
  },
  z.boolean()
)
