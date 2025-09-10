import { Router } from 'express'
import { IslandQuerySchema } from '@/scripts/openapi/docs/api.schema.js'
import { validate } from '@/middleware/validate.js'

import {
  getIslandById,
  getIslands,
  getIslandsFull
} from '@/controllers/island.js'

const router = Router()
const validateIslandsList = validate(IslandQuerySchema)

/** Fetch all islands groups */
router.get('/islands', validateIslandsList, getIslands)

/** Fetches all islands groups including their regions[] */
router.get('/islands/full', validateIslandsList, getIslandsFull)

/** Fetch an island group by ID */
router.get('/islands/:id', validateIslandsList, getIslandById)

export default router
