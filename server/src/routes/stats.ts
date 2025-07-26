import { Router } from 'express'
import { StatsApiSchema } from '@/schemas/stats.schema.js'
import { validate } from '@/middlewares/validate.js'

import { getStatsById } from '@/controllers/stats.js'

const router = new Router()
const validateStatsParams = validate(StatsApiSchema)

/** Finds the number of Barangays of a Municipality by ID */
router.get('/barangays/:id', validateStatsParams, getStatsById)

export default router
