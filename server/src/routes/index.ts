import { Router } from 'express'
import islandRouter from './island.js'
import municipalityRouter from './municipality.js'
import provinceRouter from './province.js'
import regionRouter from './region.js'
import statsRouter from './stats.js'
// import swaggerRouter from './swagger.js'

const router = Router()

router.use(islandRouter)
router.use(municipalityRouter)
router.use(provinceRouter)
router.use(regionRouter)
router.use(statsRouter)

// Comment out to use swagger ui from the static directory
// router.use(swaggerRouter)

export default router
