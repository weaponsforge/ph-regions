import { Router } from 'express'
import { StatsApiSchema } from '@/schemas/stats.schema.js'
import { validate } from '@/middlewares/validate.js'

import { getStatsById } from '@/controllers/stats.js'

const router = Router()
const validateStatsParams = validate(StatsApiSchema)

/** Finds the number of Barangays of a Municipality by ID */
router.get('/stats/:id', validateStatsParams, getStatsById)

export default router
