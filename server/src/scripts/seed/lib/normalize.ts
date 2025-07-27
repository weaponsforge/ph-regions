import type { ExcelFactory } from 'ph-municipalities'

import type { TMunicipality } from '@/schemas/municipality.schema.js'
import type { TProvinceData } from '@/schemas/province.schema.js'
import type { TRegionData } from '@/schemas/region.schema.js'
import type { TStatsData } from '@/schemas/stats.schema.js'

export type removeFields = '_id' | '__v' | 'createdAt' | 'updatedAt'
export type DRegion = Omit<TRegionData, removeFields | 'provinces'>
export type DProvince = Omit<TProvinceData, removeFields | 'municipalities'>
export type DMunicipality = Omit<TMunicipality, removeFields>
export type DStats = Omit<TStatsData, removeFields>

/**
 * Transforms the regions data of `ExcelFactory` for normalized `Region` document input
 * @param {ExcelFactory} dataSet - Instance of an `ExcelFactory` or `ExcelFile` class
 * @returns {DRegion[]} List of `DRegion[]`
 */
export const normalizeRegions = (dataSet: ExcelFactory): DRegion[] => {
  const regionNames = dataSet.listRegions('name')
  const regionAbbrevs = dataSet.listRegions('abbrev')
  const regionalNums = dataSet.listRegions('region_num')
  const regionalNames = dataSet.listRegions('region_name')

  return regionNames.reduce((list: DRegion[], item: string, index: number) => {
    const region = {
      name: item,
      abbrev: regionAbbrevs[index],
      regionalName: regionalNames[index],
      regionalCode: regionalNums[index]
    }

    return [...list, region]
  }, [])
}

/**
 * Transforms the provinces data of `ExcelFactory` with placeholder `regionId` for normalized `Province` document input
 * @param {ExcelFactory} dataSet - Instance of an `ExcelFactory` or `ExcelFile` class
 * @param {DRegion[]} regions list of `DRegion[]` objects
 * @returns {DProvince[]} List of `DProvince[]`
 */
export const normalizeProvinces = (
  dataSet: ExcelFactory, regions: DRegion[]
): DProvince[] => {
  return regions.reduce((list: DProvince[], region: DRegion) => {
    const provincesByRegion = dataSet.listProvinces(region.name)

    const provinceItems = provincesByRegion.reduce(
      (provinceList: DProvince[], province: string
      ) => {
        const provinceObj = {
          regionId: region.name,
          name: province
        }

        return [...provinceList, provinceObj]
      }, [])

    return [...list, ...provinceItems]
  }, [])
}

/**
 * Transforms the municipalities data of `ExcelFactory` with placeholder `regionId` and `provinceId` for normalized `Municipality` document input
 * @param {ExcelFactory} dataSet - Instance of an `ExcelFactory` or `ExcelFile` class
 * @param {DProvince[]} provinces list of `DProvince[]` objects
 * @returns {DMunicipality[]} List of `DMunicipality[]`
 */
export const normalizeMunicipalities = (
  dataSet: ExcelFactory, provinces: DProvince[]
): DMunicipality[] => {
  return provinces.reduce((list: DMunicipality[], province: DProvince) => {
    const { regionId, name } = province
    const municipalityList = dataSet.listMunicipalities({ provinces: [name] })

    if (municipalityList[name] === undefined) {
      return list
    }

    const municipalityItems = municipalityList?.[name].reduce(
      (municipalityList: DMunicipality[], municipality: string) => {
        const municipalityObj = {
          regionId,
          provinceId: name,
          name: municipality,
          numDocs: 0
        }

        return [ ...municipalityList, municipalityObj]
      }, [])

    return [...list, ...municipalityItems]
  }, [])
}

/**
 * Replaces the value of `data[].regionId` or `data[].provinceId` with real Document `_id` value from the `keyValues` object.
 * @param {DProvince[] | DMunicipality[]} data `DProvince[] | DMunicipality[]` normalized data to insert into a collection.
 * @param {Record<string, string>} keyValues On Object with `data.name` as keys and Document `_id` as values.
 * @param {string} key `regionId` or `provinceId` Document `_id` to put into the `keyValues` value.
 * @returns {DProvince[] | DMunicipality[]} `data` with real values of `regionId` or `provinceId`
 */
export const replaceId = (
  data: DProvince[] | DMunicipality[],
  keyValues: Record<string, any>,
  key: 'regionId' | 'provinceId'
) => {
  return data.map(item => {
    const regionIdKey = item.regionId.toString()
    const regionIdStr = ({ regionId: keyValues[regionIdKey] })

    return {
      ...item,
      ...(key === 'regionId' && regionIdStr),
      ...(key === 'provinceId' && 'provinceId' in item && ({ provinceId: keyValues[item.provinceId.toString()] }))
    }
  })
}
