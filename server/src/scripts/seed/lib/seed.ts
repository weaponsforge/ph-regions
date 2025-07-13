import type { TProvinceData, TRegionData } from '@/models/schemas.js'

import Region from '@/models/region.model.js'
import Province from '@/models/province.model.js'
import Municipality from '@/models/municipality.model.js'

import type { DMunicipality, DRegion, DProvince } from './normalize.js'

/**
 * Inserts normalized `Region[]` data into the `regions` collection.
 * @returns {Promise<Record<string, string>>} Object with inserted region names as keys and `TRegionData._id` as values
 */
export const seedRegions = async (regions: DRegion[]): Promise<Record<string, string>> => {
  try {
    await Region.deleteMany({})

    const result = await Region.insertMany(regions, {
      ordered: false,
      rawResult: true
    })

    console.log(`---inserted ${result.insertedCount} regions`)

    return (result?.mongoose?.results as TRegionData[])?.reduce((list, item) => {
      if (item._id === undefined) return list
      return { ...list, [item.name]: item._id.toString() }
    }, {})
  } catch (error) {
    throw error
  }
}

/**
 * Inserts normalized `Province[]` data into the `provinces` collection.
 * @returns {Promise<Record<string, string>>} Object with inserted province names as keys and `TProvinceData._id` as values
 */
export const seedProvinces = async (provinces: DProvince[]): Promise<Record<string, string>> => {
  try {
    await Province.deleteMany({})

    const result = await Province.insertMany(provinces, {
      ordered: false,
      rawResult: true
    })

    console.log(`---inserted ${result.insertedCount} provinces`)

    return (result?.mongoose?.results as TProvinceData[])?.reduce((list, item) => {
      if (item._id === undefined) return list
      return { ...list, [item.name]: item._id.toString() }
    }, {})
  } catch (error) {
    throw error
  }
}

/**
 * Inserts normalized `Municipality[]` data into the `municipalities` collection.
 */
export const seedMunicipalities = async (municipalities: DMunicipality[]) => {
  try {
    await Municipality.deleteMany({})

    const result = await Municipality.insertMany(municipalities, {
      ordered: false,
      rawResult: true
    })

    console.log(`---inserted ${result.insertedCount} municipalities`)
  } catch (error) {
    throw error
  }
}
