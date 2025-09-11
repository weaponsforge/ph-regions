import MongoCrudClass from '@/classes/mongo.class.js'
import Island from '@/models/island.model.js'
import { buildExcludedMetaFields } from '@/utils/constants.js'
import { ServerError } from '@/utils/error.js'

import type { ExpressFnParams } from '@/types/types.js'
import islandsData from '@/scripts/seed/data/islands.json' with { type: 'json' }

const IslandInstance = new MongoCrudClass(Island)

/** Returns a collection of island groups */
export const getIslands: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { includeMeta: _, ...rest } = req.query

  try {
    const data = await IslandInstance.getDocs(rest, { includeMeta, isLean: true })
    const total = data?.length || 0

    return res.status(200).json({
      success: true,
      total,
      metadata: islandsData.metadata,
      data
    })
  } catch (err) {
    return next(err)
  }
}

/** Returns a collection of island groups including its `regions[]` list */
export const getIslandsFull: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { includeMeta: _, ...rest } = req.query
  const excludedMetaFields = buildExcludedMetaFields(includeMeta)

  try {
    const data = await Island
      .find(rest, excludedMetaFields)
      .populate({
        path: 'regions',
        select: excludedMetaFields
      })
      .lean()
      .exec()

    const total = data?.length || 0

    return res.status(200).json({
      success: true,
      total,
      metadata: islandsData.metadata,
      data
    })
  } catch (err) {
    return next(err)
  }
}

/** Returns an island by ID */
export const getIslandById: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { id: islandId } = req.params

  try {
    const data = await IslandInstance.getDocById(islandId!, { includeMeta, isLean: true })

    if (!data) {
      throw new ServerError('Island group not found', 404)
    }

    return res.status(200).json({
      success: true,
      total: data ? 1 : 0,
      metadata: islandsData.metadata,
      data
    })
  } catch (err: unknown) {
    return next(err)
  }
}
