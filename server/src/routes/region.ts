import { Router } from 'express'
import { RegionDataSchema } from '@/models/schemas.js'
import { validate } from '@/middlewares/validate.js'

import {
  createRegion,
  getRegions,
  getRegionsFull
} from '@/controllers/region.js'

const router = Router()
const validateRegionParams = validate(RegionDataSchema)

/** Create a region */
router.post('/region', validateRegionParams, createRegion)

/** Fetch all regions */
router.get('/region', getRegions)

/** Fetch all regions with complete with provinces and municipalities */
router.get('/region/full', getRegionsFull)

export default router
