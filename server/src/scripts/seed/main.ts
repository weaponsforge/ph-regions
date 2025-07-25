import { ExcelFactory } from 'ph-municipalities'
import { connectDb, disconnectDb } from '@/utils/db.js'

import Region from '@/models/region.model.js'
import Province from '@/models/province.model.js'
import Municipality from '@/models/municipality.model.js'
import Stats from '@/models/stats.model.js'

import {
  normalizeRegions,
  normalizeProvinces,
  normalizeMunicipalities,
  replaceId,
  type DMunicipality,
  type DStats
} from './lib/normalize.js'

import { seed, type SeedingResult } from './lib/seed.js'
import { generateBarangayCounts } from './lib/generateCounts.js'

// TO-DO: seed using transactions and sessions in a replica set
connectDb().then(async () => {
  const dataSet = new ExcelFactory()

  // Normalize data
  const regions = normalizeRegions(dataSet)
  let provinces = normalizeProvinces(dataSet, regions)
  let municipalities = normalizeMunicipalities(dataSet, provinces)
  let statsBarangays: DStats[] = []

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
  const municipalityKeyIds = await seed(Municipality, municipalities, { isReturnRaw: true }) as SeedingResult

  // Seed the random barangay counts per municipality
  statsBarangays = generateBarangayCounts(municipalityKeyIds)
  await seed(Stats, statsBarangays)

  await disconnectDb()
})
