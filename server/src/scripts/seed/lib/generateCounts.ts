import type { SeedingResult } from './seed.js'
import type { TStatsData } from '@/models/schemas.js'

/**
 * Generates random number of barangays for each municipality item.
 * @param municipalities - Array of `Municipalities` without the standard Mongo
 * document fields (eg., `_id`, `__v`, etc)
 * @returns {TStatsData[]} Initial `municipalities[]` data with `numBrgy` - random number of barangay per item
 */
export const generateBarangayCounts = (municipalities: SeedingResult): TStatsData[] => {
  return municipalities.reduce((list: TStatsData[], municipality: SeedingResult) => {
    const item = {
      municipalityId: municipality._id.toString(),
      numBrgy: Math.floor(Math.random() * (1000 - 100 + 1)) + 100
    }

    return [...list, item]
  }, [])
}
