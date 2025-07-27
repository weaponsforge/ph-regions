import { Router } from 'express'
import municipalityRouter from './municipality.js'
import provinceRouter from './province.js'
import regionRouter from './region.js'
import statsRouter from './stats.js'

const router = Router()

router.use(municipalityRouter)
router.use(provinceRouter)
router.use(regionRouter)
router.use(statsRouter)

export default router
