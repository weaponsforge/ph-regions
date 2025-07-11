import { Router } from 'express'
import { createRegion, getRegions } from '@/controllers/region.js'
import { validateCreateRegion } from '@/middlewares/region.middleware.js'

const router = Router()

/** Create a region */
router.post('/region', validateCreateRegion, createRegion)

// Fetch all regions
router.get('/regions', getRegions)

export default router
