import { Router } from 'express'
import { createProvince, getProvinces } from '@/controllers/province.js'
import { validateCreateProvince } from '@/middlewares/province.middleware.js'

const router = Router()

/** Create a province */
router.post('/province', validateCreateProvince, createProvince)

// Fetch all provinces
router.get('/provinces', getProvinces)

export default router
