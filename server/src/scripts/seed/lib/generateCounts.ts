import type { DStats } from './normalize.js'
import type { TStatsData } from '@/schemas/stats.schema.js'

/**
 * Generates random number of barangays for each municipality item.
 * @param municipalities - Array of `Municipalities` without the standard Mongo
 * document fields (eg., `_id`, `__v`, etc)
 * @returns {TStatsData[]} Initial `municipalities[]` data with `numBrgy` - random number of barangay per item
 */
export const generateBarangayCounts = (municipalities: TStatsData[]): DStats[] => {
  return municipalities.reduce((list: DStats[], municipality: TStatsData) => {
    if (municipality._id === undefined) return list

    const item = {
      municipalityId: municipality._id.toString(),
      numBrgy: Math.floor(Math.random() * (1000 - 100 + 1)) + 100
    }

    return [...list, item]
  }, [])
}
