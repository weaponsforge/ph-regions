import { Router } from 'express'
import regionRouter from './region.js'
import provinceRouter from './province.js'

const router = new Router()

router.use(provinceRouter)
router.use(regionRouter)

export default router
