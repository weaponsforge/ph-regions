import { Router } from 'express'
import { ProvinceQuerySchema } from '@/scripts/openapi/docs/api.schema.js'
import { validate } from '@/middleware/validate.js'

import {
  getProvinces,
  getProvinceById,
  getProvincesFull,
  getProvinceMunicipalities
} from '@/controllers/province.js'

const router = Router()
const validateProvinceParams = validate(ProvinceQuerySchema)

/** Fetch all provinces */
router.get('/provinces', validateProvinceParams, getProvinces)

/** Fetch all provinces (optionally filtered by regionId) including their municipalities[] */
router.get('/provinces/full', validateProvinceParams, getProvincesFull)

/** Fetch a province by ID */
router.get('/provinces/:id', validateProvinceParams, getProvinceById)

/** Fetch a province by ID including its municipalities[] */
router.get('/provinces/:id/municipalities', validateProvinceParams, getProvinceMunicipalities)

export default router
