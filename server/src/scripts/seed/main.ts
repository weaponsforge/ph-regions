import { ExcelFactory } from 'ph-municipalities'
import { connectDb, disconnectDb } from '@/utils/db.js'

import Island from '@/models/island.model.js'
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

import islandsData from './data/islands.json' with { type: 'json' }
import { typedCatchError } from '@/utils/error.js'
let errorSeeding: string | null = null

// TO-DO: seed using transactions and sessions in a replica set
connectDb().then(async () => {
  const dataSet = new ExcelFactory()

  // Normalize and transform raw data
  const islands = [ ...islandsData.data ]
  const regions = normalizeRegions(dataSet)
  let provinces = normalizeProvinces(dataSet, regions)
  let municipalities = normalizeMunicipalities(dataSet, provinces)
  let statsBarangays: DStats[] = []

  let regionKeyIDs = {}
  let provinceKeyIDs = {}
  let municipalityKeyIds = []

  try {
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
  } catch (err: unknown) {
    const errMsg = typedCatchError(err)
    throw new Error(`Seeding Islands - ${errMsg}`)
  }

  try {
    // [1] Seed regions collection
    regionKeyIDs = await seed(
      Region,
      regions,
      { isReturnMapping: true }
    ) as SeedingResult

    provinces = replaceId(provinces, regionKeyIDs, 'regionId')
  } catch (err: unknown) {
    const errMsg = typedCatchError(err)
    throw new Error(`Seeding Regions - ${errMsg}`)
  }

  try {
    // [2] Seed provinces collection
    provinceKeyIDs = await seed(
      Province,
      provinces,
      { isReturnMapping: true }
    ) as SeedingResult

    // Replace placeholder `regionId` and `provinceId` IDs in the local municipalities
    municipalities = replaceId(municipalities, regionKeyIDs, 'regionId') as DMunicipality[]
    municipalities = replaceId(municipalities, provinceKeyIDs, 'provinceId') as DMunicipality[]
  } catch (err: unknown) {
    const errMsg = typedCatchError(err)
    throw new Error(`Seeding Provinces - ${errMsg}`)
  }

  try {
    // [3] Seed municipalities collection
    municipalityKeyIds = await seed(
      Municipality,
      municipalities,
      { isReturnRaw: true }
    ) as unknown as TMunicipality[]
  } catch (err: unknown) {
    const errMsg = typedCatchError(err)
    throw new Error(`Seeding Municipalities - ${errMsg}`)
  }

  try {
    // [4] Seed the random barangay counts per municipality
    statsBarangays = generateBarangayCounts(municipalityKeyIds)
    await seed(Stats, statsBarangays)
  } catch (err: unknown) {
    const errMsg = typedCatchError(err)
    throw new Error(`Seeding Stats - ${errMsg}`)
  }
}).catch((error: unknown) => {
  const errMsg = typedCatchError(error)
  errorSeeding = `[ERROR]: ${errMsg}`
}).finally(() => {
  disconnectDb()

  const logSuccess = errorSeeding ?? '[SUCCESS] Seeding success'
  const processExitCode = errorSeeding ? 1 : 0

  console.log(logSuccess, processExitCode)
  process.exit(processExitCode)
})
