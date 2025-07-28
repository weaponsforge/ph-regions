import { z } from 'zod'
import { BooleanValueSchema } from './common.schema.js'

export const IslandDataSchema = z.object({
  _id: z.string().optional(),
  __v: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  name: z.string().max(40)
})

export const IslandApiSchema = IslandDataSchema.pick({
  name: true
}).extend({
  includeMeta: BooleanValueSchema
})
  .partial()
  .strict()

export type TIslandData = z.infer<typeof IslandDataSchema>
