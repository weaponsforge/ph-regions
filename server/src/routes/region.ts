import { Router } from 'express'
import { RegionQuerySchema } from '@/scripts/openapi/docs/api.schema.js'
import { validate } from '@/middleware/validate.js'

import {
  getRegions,
  getRegionById,
  getRegionsFull,
  getRegionProvinces
} from '@/controllers/region.js'


const router = Router()
const validateRegionListParams = validate(RegionQuerySchema)

/** Fetch all regions */
router.get('/regions', validateRegionListParams, getRegions)

/** Fetches all regions including their provinces[] and municipalities[] */
router.get('/regions/full', validateRegionListParams, getRegionsFull)

/** Fetch a region by ID */
router.get('/regions/:id', validateRegionListParams, getRegionById)

/** Fetch a region by ID including its provinces[] with municipalities[] */
router.get('/regions/:id/provinces', validateRegionListParams, getRegionProvinces)

export default router
