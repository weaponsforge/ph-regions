import RegionClass from "@/classes/region.class.js";
import { type TRegionData } from "@/models/schemas.js";
import { connectDb } from "@/utils/db.js";

const Region = new RegionClass()

const seedRegion = async () => {
  const data: TRegionData[] = [
    { regionId: 1, name: "Bicol" },
    { regionId: 2, name: "Zampen" }
  ]

  const requests = data.map(item => Region.create(item))
  const response = await Promise.all(requests)

  console.log('---done', response)
}

connectDb().then(() => {
  console.log('---seeding regions')
  seedRegion()
})

