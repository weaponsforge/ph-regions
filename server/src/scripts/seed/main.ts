import { ExcelFactory } from 'ph-municipalities'
import { connectDb, disconnectDb } from '@/utils/db.js'

import Region from '@/models/region.model.js'
import Province from '@/models/province.model.js'
import Municipality from '@/models/municipality.model.js'

import {
  normalizeRegions,
  normalizeProvinces,
  normalizeMunicipalities,
  replaceId,
  type DMunicipality
} from './lib/normalize.js'

import { seed, type SeedingResult } from './lib/seed.js'

connectDb().then(async () => {
  const dataSet = new ExcelFactory()

  // Normalize data
  const regions = normalizeRegions(dataSet)
  let provinces = normalizeProvinces(dataSet, regions)
  let municipalities = normalizeMunicipalities(dataSet, provinces)

  // Seed regions collection
  const regionKeyIDs = await seed(
    Region,
    regions,
    { isReturnMapping: true }
  ) as SeedingResult

  provinces = replaceId(provinces, regionKeyIDs, 'regionId')

  // Seed provinces collection
  const provinceKeyIDs = await seed(
    Province,
    provinces,
    { isReturnMapping: true }
  ) as SeedingResult

  // Replace placeholder `regionId` and `provinceId` IDs in the local municipalities
  municipalities = replaceId(municipalities, regionKeyIDs, 'regionId') as DMunicipality[]
  municipalities = replaceId(municipalities, provinceKeyIDs, 'provinceId') as DMunicipality[]

  // Seed municipalities collection
  await seed(Municipality, municipalities)
  await disconnectDb()
})
