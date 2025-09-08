import { Router } from 'express'
import { validate } from '@/middlewares/validate.js'

import { getStatsById } from '@/controllers/stats.js'
import { StatsQuerySchema } from '@/scripts/openapi/docs/api.schema.js'

const router = Router()
const validateStatsParams = validate(StatsQuerySchema)

/** Finds the number of Barangays of a Municipality by ID */
router.get('/stats/:id', validateStatsParams, getStatsById)

export default router
