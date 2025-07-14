import { Router } from 'express'
import { ProvinceDataSchema } from '@/models/schemas.js'
import { validate } from '@/middlewares/validate.js'

import {
  createProvince,
  getProvinces,
  getProvincesFull
} from '@/controllers/province.js'

const router = Router()
const validateProvinceParams = validate(ProvinceDataSchema)

/** Create a province */
router.post('/province', validateProvinceParams, createProvince)

/** Fetch all provinces */
router.get('/province', getProvinces)

/** Fetch all provinces complete municipalities */
router.get('/province/full', getProvincesFull)

export default router
