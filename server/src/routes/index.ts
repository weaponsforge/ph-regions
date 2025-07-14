import { Router } from 'express'
import municipalityRouter from './municipality.js'
import provinceRouter from './province.js'
import regionRouter from './region.js'


const router = Router()

router.use(municipalityRouter)
router.use(provinceRouter)
router.use(regionRouter)

export default router
