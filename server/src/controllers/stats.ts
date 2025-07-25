import StatsInstance from '@/classes/stats.instance.js'
import { type ExpressFnParams } from '@/types/types.js'

export const getStat: ExpressFnParams = async (req, res, next) => {
  const { municipalityId } = req.query

  try {
    const stat = municipalityId
      ? await StatsInstance.get(municipalityId)
      : await StatsInstance.list(false)

    return res.status(201).json(stat)
  } catch (err) {
    return next(err)
  }
}
