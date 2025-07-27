import MongoCrudClass from '@/classes/mongo.class.js'
import Region from '@/models/region.model.js'
import { buildExcludedMetaFields } from '@/utils/constants.js'
import { ServerError } from '@/utils/error.js'

import type { ExpressFnParams } from '@/types/types.js'

const RegionInstance = new MongoCrudClass(Region)

const fullMetaData = {
  description: 'List of Philippine regions and their municipalities and provinces',
  source: 'PAGASA Seasonal Rainfall Analysis Table (regions and provinces) and 10-Day Weather Forecast Excel file (provinces and municipalities)'
}

/** Returns a collection of regions (multiple regions) */
export const getRegions: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { includeMeta: _, ...rest } = req.query

  try {
    const data = await RegionInstance.getDocs(rest, includeMeta)
    const total = data?.length || 0

    return res.status(200).json({
      success: true,
      total,
      metadata: {
        description: 'List of Philippine regions',
        source: 'PAGASA Seasonal Rainfall Analysis Table (regions and provinces)'
      },
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
      metadata: fullMetaData,
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
    const data = await RegionInstance.getDocById(regionId!, includeMeta)

    if (!data) {
      throw new ServerError('Region not found', 404)
    }

    return res.status(200).json({
      success: true,
      metadata: {
        description: 'Philippine region information',
        source: 'PAGASA Seasonal Rainfall Analysis Table (regions and provinces)'
      },
      data
    })
  } catch (err: any) {
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
      metadata: fullMetaData,
      data
    })
  } catch (err) {
    return next(err)
  }
}
