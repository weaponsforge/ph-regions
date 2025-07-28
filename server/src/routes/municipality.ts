import { Router } from 'express'
import { MunicipalityApiSchema } from '@/schemas/municipality.schema.js'
import { validate } from '@/middlewares/validate.js'

import {
  getMunicipalities,
  getMunicipalityById
} from '@/controllers/municipality.js'

const router = Router()
const validateMunicipalityParams = validate(MunicipalityApiSchema)

/** Fetch all provinces */
router.get('/municipalities', validateMunicipalityParams, getMunicipalities)

/** Fetch a municipality by ID */
router.get('/municipalities/:id', validateMunicipalityParams, getMunicipalityById)

export default router
