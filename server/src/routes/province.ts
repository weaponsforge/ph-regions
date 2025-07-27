import { Router } from 'express'
import { ProvinceApiSchema, ProvinceApiFullSchema } from '@/schemas/province.schema.js'
import { validate } from '@/middlewares/validate.js'

import {
  getProvinces,
  getProvinceById,
  getProvincesFull,
  getProvinceMunicipalities
} from '@/controllers/province.js'

const router = Router()
const validateProvinceParams = validate(ProvinceApiSchema)
const validateProvinceParamsFull = validate(ProvinceApiFullSchema)

/** Fetch all provinces */
router.get('/provinces', validateProvinceParams, getProvinces)

/** Fetches all provinces by region ID including their municipalities[] */
router.get('/provinces/full', validateProvinceParamsFull, getProvincesFull)

/** Fetch a province by ID */
router.get('/provinces/:id', validateProvinceParams, getProvinceById)

/** Fetch a province by ID including its municipalities[] */
router.get('/provinces/:id/municipalities', validateProvinceParams, getProvinceMunicipalities)

export default router
