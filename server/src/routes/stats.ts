import { Router } from 'express'
import { StatsFindId } from '@/models/schemas.js'
import { PARAM_METHODS } from '@/types/types.js'
import { validate } from '@/middlewares/validate.js'

import { getStat } from '@/controllers/stats.js'

const router = new Router()
const validateStatsParams = validate(StatsFindId, PARAM_METHODS.QUERY)

/** Finds the number of Barangays of a Municipality by ID */
router.get('/barangay/stats', validateStatsParams, getStat)

export default router
