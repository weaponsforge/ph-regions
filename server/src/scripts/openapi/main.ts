import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import { fileURLToPath } from 'url'

import {
  OpenApiGeneratorV3,
  OpenAPIRegistry
} from '@asteasolutions/zod-to-openapi'

// Zod schemas
import { IslandDataSchema } from '@/schemas/island.schema.js'
import { MunicipalityDataSchema } from '@/schemas/municipality.schema.js'
import { ProvinceDataSchema } from '@/schemas/province.schema.js'
import { RegionDataSchema } from '@/schemas/region.schema.js'
import { StatsDataSchema } from '@/schemas/stats.schema.js'

// Constants
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * WARNING: OpenAPI-related codeblocks after this line needs to have
 * imported the ./zod-extend.ts block (currently via package.json script)
 */

// Globals
const registry = new OpenAPIRegistry()

/**
 * Generate the OpenAPI docs using the global registry object
 * @returns {OpenAPIObject} OpenAPI docs string
 */
const generateOpenApiDocs = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions)

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'PH Regions API',
      description: 'A RESTful API that serves hierarchical location data of the Philippines — including regions, provinces municipalities, and a randomly generated number of barangays per municipality for testing purposes.'
    },
    servers: [{ url: 'http://localhost:3001/api' }]
  })
}

/**
 * Register the main objects (models) as OpenAPI schemas
 */
const registerMainSchemas = () => {
  registry.register('Island', IslandDataSchema)
  registry.register('Municipality', MunicipalityDataSchema)
  registry.register('Province', ProvinceDataSchema)
  registry.register('Region', RegionDataSchema)
  registry.register('Stats', StatsDataSchema)
}

/**
 * Entry point for generating the OpenAPI yaml docs
 */
const main = () => {
  registerMainSchemas()

  const docs = generateOpenApiDocs()
  const fileContent = yaml.stringify(docs)

  fs.writeFileSync(`${__dirname}/openapi-docs.yaml`, fileContent, {
    encoding: 'utf-8'
  })
}

main()
