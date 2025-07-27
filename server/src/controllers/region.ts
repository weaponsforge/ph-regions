import MongoCrudClass from '@/classes/mongo.class.js'
import Region from '@/models/region.model.js'
import { buildExcludedMetaFields } from '@/utils/constants.js'
import { ServerError } from '@/utils/error.js'

import type { ExpressFnParams } from '@/types/types.js'
import { fullApiMetaData } from '@/utils/constants.js'

const RegionInstance = new MongoCrudClass(Region)

/** Returns a collection of regions (multiple regions) */
export const getRegions: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { includeMeta: _, ...rest } = req.query

  try {
    const data = await RegionInstance.getDocs(rest, { includeMeta, isLean: true })
    const total = data?.length || 0

    return res.status(200).json({
      success: true,
      total,
      metadata: fullApiMetaData,
      data
    })
  } catch (err) {
    return next(err)
  }
}

/** Returns a collection of regions `provinces[]` and `municipalities[]` */
export const getRegionsFull: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { includeMeta: _, ...rest } = req.query
  const excludedMetaFields = buildExcludedMetaFields(includeMeta)

  try {
    const data = await Region
      .find(rest, excludedMetaFields)
      .populate({
        path: 'provinces',
        select: excludedMetaFields,
        populate: {
          path: 'municipalities',
          select: excludedMetaFields
        }
      })
      .lean()
      .exec()

    const total = data?.length || 0

    return res.status(200).json({
      success: true,
      total,
      metadata: fullApiMetaData,
      data
    })
  } catch (err) {
    return next(err)
  }
}

/** Returns a region by ID */
export const getRegionById: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { id: regionId } = req.params

  try {
    const data = await RegionInstance.getDocById(regionId!, { includeMeta, isLean: true })

    if (!data) {
      throw new ServerError('Region not found', 404)
    }

    return res.status(200).json({
      success: true,
      metadata: fullApiMetaData,
      data
    })
  } catch (err: unknown) {
    return next(err)
  }
}

/** Returns a region by ID including its `provinces[]` and `municipalities[]` */
export const getRegionProvinces: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { id: regionId } = req.params

  const excludedMetaFields = buildExcludedMetaFields(includeMeta)

  try {
    const data = await Region
      .findById(regionId, excludedMetaFields)
      .populate({
        path: 'provinces',
        select: excludedMetaFields,
        populate: {
          path: 'municipalities',
          select: excludedMetaFields
        }
      })
      .lean()
      .exec()

    if (!data) {
      throw new ServerError('Region not found', 404)
    }

    return res.status(200).json({
      success: true,
      metadata: fullApiMetaData,
      data
    })
  } catch (err) {
    return next(err)
  }
}
