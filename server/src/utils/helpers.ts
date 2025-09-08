import { z } from 'zod'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { COMMON_FIELDS_TO_OMIT } from './constants.js'
import { BooleanValueSchema } from '@/schemas/common.schema.js'

/**
 * Get the full file path of the current directory of a module file equivalent to `"__dirname"`from
 * scripts running as ESM modules whose package.json has `"type": "module"`.
 * @param {string} moduleFile - File URL of the current module being executed: `"import.meta.url"`
 * @returns {string} Full file path to the directory of the calling file/module also know as `__dirname` in CommonJS
 */
export const directory = (moduleFile: string): string => {
  const filePath = fileURLToPath(moduleFile)
  return dirname(filePath)
}

/**
 * Returns the full system file path to a file
 * @param {string} moduleFile - File URL of the current module being executed: `"import.meta.url"`
 * @param {string} fileName - File name relative to the calling directory (`moduleFile`), eg: `input.txt`, `../input.txt`, or `some/folder/input.txt`
 * @returns {string} Full file path to a file
 */
export const file = (moduleFile: string, fileName: string) => {
  return path.join(directory(moduleFile), fileName)
}

/**
 * Helper function to omit common Zod fields
 * @param schema - Zod schema
 * @param {string[]} additionalFields - Array of Zod fields to omit
 * @returns Zod schema with specified fields omitted
 */
export const omitCommonFields = <T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  additionalFields: string[] = []
) => {
  const fieldsToOmit = [...COMMON_FIELDS_TO_OMIT, ...additionalFields]
  const mask = Object.fromEntries(fieldsToOmit.map((item) => [item, true])) as Record<string, true>
  return schema.omit(mask)
}

/**
 * Helper function for building Zod query schemas from database Zod schemas
 * @param schema Zod schema
 * @param omit fields to omit from the Zod schema
 * @returns Zod schema added with common query fields and omitted with specified fields omitted
 */
export const buildQuerySchema = <T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  omit: string[]
) => {
  return omitCommonFields(schema, omit)
    .extend({ includeMeta: BooleanValueSchema })
    .partial()
    .strict()
}
