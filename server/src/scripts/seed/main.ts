import { ExcelFactory } from 'ph-municipalities'
import { connectDb, disconnectDb } from '@/utils/db.js'

import {
  normalizeRegions,
  normalizeProvinces,
  normalizeMunicipalities,
  replaceId,
  type DMunicipality,
} from './lib/normalize.js'

import {
  seedRegions,
  seedProvinces,
  seedMunicipalities
} from './lib/seed.js'

connectDb().then(async () => {
  const dataSet = new ExcelFactory()

  // Normalize data
  const regions = normalizeRegions(dataSet)
  let provinces = normalizeProvinces(dataSet, regions)
  let municipalities = normalizeMunicipalities(dataSet, provinces)

  // Seed regions collection
  const regionKeyIDs = await seedRegions(regions)
  provinces = replaceId(provinces, regionKeyIDs, 'regionId')

  // Seed provinces collection
  const provinceKeyIDs = await seedProvinces(provinces)

  // Replace placeholder `regionId` and `provinceId` IDs in the local municipalities
  municipalities = replaceId(municipalities, regionKeyIDs, 'regionId') as DMunicipality[]
  municipalities = replaceId(municipalities, provinceKeyIDs, 'provinceId') as DMunicipality[]

  // Seed municipalities collection
  await seedMunicipalities(municipalities)
  await disconnectDb()
})
