import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

// Extend zod with @asteasolutions/zod-to-openapi before importing any schemas
// Call with: `tsx --import ./zod-extend.ts`
extendZodWithOpenApi(z)
