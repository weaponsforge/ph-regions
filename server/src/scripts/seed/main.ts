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
import type { TMunicipality } from '@/schemas/municipality.schema.js'
import Island from '@/models/island.model.js'

import islandsData from './data/islands.json' with { type: 'json' }

// TO-DO: seed using transactions and sessions in a replica set
connectDb().then(async () => {
  const dataSet = new ExcelFactory()

  // Normalize and transform raw data
  const regions = normalizeRegions(dataSet)
  const islands = [ ...islandsData.data ]
  let provinces = normalizeProvinces(dataSet, regions)
  let municipalities = normalizeMunicipalities(dataSet, provinces)
  let statsBarangays: DStats[] = []

  // Seed the main island groups
  const islandGroupIDs = await seed(
    Island,
    islandsData.data.map(item => ({ name: item.name })),
    { isReturnMapping: true }
  ) as SeedingResult

  // Use seeded island IDs in the regions data
  for (const region of regions) {
    islands.forEach(island => {
      if (!island.regions.includes(region.name)) return
      region.islandId = islandGroupIDs[island.name] || '-'
    })
  }

  // [1] Seed regions collection
  const regionKeyIDs = await seed(
    Region,
    regions,
    { isReturnMapping: true }
  ) as SeedingResult

  provinces = replaceId(provinces, regionKeyIDs, 'regionId')

  // [2] Seed provinces collection
  const provinceKeyIDs = await seed(
    Province,
    provinces,
    { isReturnMapping: true }
  ) as SeedingResult

  // Replace placeholder `regionId` and `provinceId` IDs in the local municipalities
  municipalities = replaceId(municipalities, regionKeyIDs, 'regionId') as DMunicipality[]
  municipalities = replaceId(municipalities, provinceKeyIDs, 'provinceId') as DMunicipality[]

  // [3] Seed municipalities collection
  const municipalityKeyIds = await seed(
    Municipality,
    municipalities,
    { isReturnRaw: true }
  ) as unknown as TMunicipality[]

  // [4] Seed the random barangay counts per municipality
  statsBarangays = generateBarangayCounts(municipalityKeyIds)
  await seed(Stats, statsBarangays)

  await disconnectDb()
})
