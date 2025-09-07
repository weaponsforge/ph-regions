import { Router } from 'express'
import { MunicipalityQuerySchema } from '@/scripts/openapi/docs/api.schema.js'
import { validate } from '@/middlewares/validate.js'

import {
  getMunicipalities,
  getMunicipalityById
} from '@/controllers/municipality.js'

const router = Router()
const validateMunicipalityParams = validate(MunicipalityQuerySchema)

/** Fetch all provinces */
router.get('/municipalities', validateMunicipalityParams, getMunicipalities)

/** Fetch a municipality by ID */
router.get('/municipalities/:id', validateMunicipalityParams, getMunicipalityById)

export default router
