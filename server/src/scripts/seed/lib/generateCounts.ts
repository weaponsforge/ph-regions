import type { TMunicipality } from '@/schemas/municipality.schema.js'
import type { DStats } from './normalize.js'

/**
 * Generates a random number of barangays for each municipality item.
 * @param municipalities - Array of `Municipalities` without the standard Mongo
 * document fields (eg., `_id`, `__v`, etc)
 * @returns {TStatsData[]} Initial `municipalities[]` data with `numBrgy` - random number of barangay per item
 */
export const generateBarangayCounts = (municipalities: TMunicipality[]): DStats[] => {
  return municipalities.reduce((list: DStats[], municipality: TMunicipality) => {
    if (municipality._id === undefined) return list

    const item = {
      municipalityId: municipality._id.toString(),
      numBrgy: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
    }

    return [...list, item]
  }, [])
}
