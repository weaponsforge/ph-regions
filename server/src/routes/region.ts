import { Router } from 'express'
import { RegionDataSchema, RegionListParams } from '@/models/schemas.js'
import { PARAM_METHODS } from '@/types/types.js'
import { validate } from '@/middlewares/validate.js'

import {
  createRegion,
  getRegions,
  getRegionsFull
} from '@/controllers/region.js'

const router = Router()
const validateRegionParams = validate(RegionDataSchema)
const validateRegionListParams = validate(RegionListParams, PARAM_METHODS.QUERY)

/** Create a region */
router.post('/region', validateRegionParams, createRegion)

/** Fetch all regions */
router.get('/region', validateRegionListParams, getRegions)

/** Fetch all regions with complete with provinces and municipalities */
router.get('/region/full', validateRegionListParams, getRegionsFull)

export default router
