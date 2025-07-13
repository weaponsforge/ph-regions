import { Router } from 'express'
import { MunicipalityDataSchema } from '@/models/schemas.js'
import { validate } from '@/middlewares/validate.js'

import {
  createMunicipality,
  getMunicipalities
} from '@/controllers/municipality.js'

const router = Router()
const validateMunicipalityParams = validate(MunicipalityDataSchema)

/** Create a province */
router.post('/municipality', validateMunicipalityParams, createMunicipality)

/** Fetch all provinces */
router.get('/municipality', getMunicipalities)

export default router
