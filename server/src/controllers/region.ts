import RegionInstance from '@/classes/region.instance.js'
import { type ExpressFnParams } from '@/types/types.js'

export const createRegion: ExpressFnParams = async (req, res, next) => {
  const { name } = req.body

  try {
    const region = await RegionInstance.create({ name })

    return res.status(201).json({
      success: true,
      data: region
    })
  } catch (err) {
    return next(err)
  }
}

export const getRegions: ExpressFnParams = async (req, res, next) => {
  try {
    const regions = await RegionInstance.list(false)
    return res.status(200).json(regions)
  } catch (err) {
    return next(err)
  }
}

export const getRegionsFull: ExpressFnParams = async (req, res, next) => {
  try {
    const regions = await RegionInstance.listAll()
    return res.status(200).json(regions)
  } catch (err) {
    return next(err)
  }
}
