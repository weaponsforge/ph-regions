import MongoCrudClass from '@/classes/mongo.class.js'
import Stats from '@/models/stats.model.js'
import { ServerError } from '@/utils/error.js'

import type { ExpressFnParams } from '@/types/types.js'

const StatsInstance = new MongoCrudClass(Stats)

export const getStatsById: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { id: municipalityId } = req.params

  try {
    const data = await StatsInstance.getDocByParams(
      { municipalityId },
      { includeMeta, isLean: true }
    )

    if (!data) {
      throw new ServerError('Municipality stats not found', 404)
    }

    return res.status(200).json({
      success: true,
      metadata: {
        description: 'Municipality - barangay count stat (random count)',
        source: 'n/a'
      },
      data
    })
  } catch (err: unknown) {
    return next(err)
  }
}
