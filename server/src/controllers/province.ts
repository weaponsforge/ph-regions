import MongoCrudClass from '@/classes/mongo.class.js'
import Province from '@/models/province.model.js'
import { buildExcludedMetaFields } from '@/utils/constants.js'
import { ServerError } from '@/utils/error.js'

import type { ExpressFnParams } from '@/types/types.js'

const ProvinceInstance = new MongoCrudClass(Province)

/** Returns a collection of provinces across all regions */
export const getProvinces: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { includeMeta: _, ...rest } = req.query

  try {
    const data = await ProvinceInstance.getDocs(rest, { includeMeta, isLean: true })
    const total = data?.length || 0

    return res.status(200).json({
      success: true,
      total,
      metadata: {
        description: 'List of Philippine provinces',
        source: 'PAGASA Seasonal Rainfall Analysis Table (regions and provinces)'
      },
      data
    })
  } catch (err) {
    return next(err)
  }
}

/** Returns a collection of provinces and their `municipalities[]` by region */
export const getProvincesFull: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { includeMeta: _, ...rest } = req.query
  const excludedMetaFields = buildExcludedMetaFields(includeMeta)

  try {
    const data = await Province
      .find(rest, excludedMetaFields)
      .populate({
        path: 'municipalities',
        select: excludedMetaFields
      })
      .lean()
      .exec()

    const total = data?.length || 0

    return res.status(200).json({
      success: true,
      total,
      metadata: {
        description: 'List of Philippine provinces and their municipalities',
        source: 'PAGASA Seasonal Rainfall Analysis Table (regions and provinces) and 10-Day Weather Forecast Excel file (provinces and municipalities)'
      },
      data
    })
  } catch (err) {
    return next(err)
  }
}

/** Returns a province by ID */
export const getProvinceById: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { id: provinceId } = req.params

  try {
    const data = await ProvinceInstance.getDocById(provinceId!, { includeMeta, isLean: true })

    if (!data) {
      throw new ServerError('Province not found', 404)
    }

    return res.status(200).json({
      success: true,
      metadata: {
        description: 'Philippine province information',
        source: 'PAGASA Seasonal Rainfall Analysis Table (regions and provinces) and 10-Day Weather Forecast Excel file (provinces and municipalities)'
      },
      data
    })
  } catch (err: unknown) {
    return next(err)
  }
}

/** Returns a province by ID including its `municipalities[]` */
export const getProvinceMunicipalities: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { id: provinceId } = req.params

  const excludedMetaFields = buildExcludedMetaFields(includeMeta)

  try {
    const data = await Province
      .findById(provinceId, excludedMetaFields)
      .populate({
        path: 'municipalities',
        select: excludedMetaFields
      })
      .lean()
      .exec()

    if (!data) {
      throw new ServerError('Region not found', 404)
    }

    return res.status(200).json({
      success: true,
      metadata: {
        description: 'Philippine province and municipalities information',
        source: 'PAGASA Seasonal Rainfall Analysis Table (regions and provinces) and 10-Day Weather Forecast Excel file (provinces and municipalities)'
      },
      data
    })
  } catch (err) {
    return next(err)
  }
}
