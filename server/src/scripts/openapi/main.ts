import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import { fileURLToPath } from 'url'

import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi'

// Zod OpenAPI compatible schemas
import { IslandDocSchema } from '@/schemas/island.schema.js'
import { MunicipalityDocSchema } from '@/schemas/municipality.schema.js'
import { ProvinceDocSchema } from '@/schemas/province.schema.js'
import { RegionDocSchema } from '@/schemas/region.schema.js'
import { StatsDocSchema } from '@/schemas/stats.schema.js'

// OpenAPI docs builder
import { buildIslandDocs } from './docs/island.doc.js'
import { buildRegionDocs } from './docs/region.doc.js'
import { buildProvinceDocs } from './docs/province.doc.js'
import { buildMunicipalityDocs } from './docs/municipality.doc.js'
import { buildStatsDocs } from './docs/stats.doc.js'
import { API_INFO } from './docs/api.info.js'

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

  return generator.generateDocument(API_INFO)
}

/**
 * Register the main objects (models) as OpenAPI schemas
 */
const registerMainSchemas = () => {
  registry.register('Island', IslandDocSchema)
  registry.register('Municipality', MunicipalityDocSchema)
  registry.register('Stats', StatsDocSchema)
  registry.register('Province', ProvinceDocSchema)
  registry.register('Region', RegionDocSchema)
}

/**
 * Entry point for generating the OpenAPI yaml docs
 */
const main = () => {
  registerMainSchemas()

  // Build documentation for schemas
  buildIslandDocs(registry)
  buildRegionDocs(registry)
  buildProvinceDocs(registry)
  buildMunicipalityDocs(registry)
  buildStatsDocs(registry)

  // Generate full OpenAPI files
  const docs = generateOpenApiDocs()
  const fileContent = yaml.stringify(docs)

  const outDir = path.resolve(__dirname, '../../../', 'public')
  fs.mkdirSync(outDir, { recursive: true })

  const docPathYML = path.join(outDir, 'openapi.yaml')
  const docPathJSON = path.join(outDir, 'openapi.json')

  // Generate a YML file
  fs.writeFileSync(docPathYML, fileContent, {
    encoding: 'utf-8',
  })

  // Generate a JSON file
  fs.writeFileSync(docPathJSON, JSON.stringify(docs, null, 2), {
    encoding: 'utf-8',
  })
}

main()
