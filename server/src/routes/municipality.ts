import { Router } from 'express'
import { MunicipalityQuerySchema } from '@/scripts/openapi/docs/api.schema.js'
import { validate } from '@/middlewares/validate.js'

import {
  getMunicipalities,
  getMunicipalityById
} from '@/controllers/municipality.js'

const router = Router()
const validateMunicipalityQuery = validate(MunicipalityQuerySchema)

/** Fetch all municipalities */
router.get('/municipalities', validateMunicipalityQuery, getMunicipalities)

/** Fetch a municipality by ID */
router.get('/municipalities/:id', validateMunicipalityQuery, getMunicipalityById)

export default router
