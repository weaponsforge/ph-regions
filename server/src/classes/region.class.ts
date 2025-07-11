
import Region from "@/models/region.model.js"
import { RegionDataSchema, type TRegion } from "@/models/schemas.js"

class RegionClass {
  /** Create a new Region */
  async create (params: TRegion) {
    try {
      const resutlt = RegionDataSchema.safeParse(params)

      if (!resutlt.success) {
        throw new Error('Invalid data format')
      }

      return await new Region(params).save()
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  /** Get all Regions */
  async getAll () {
    return await Region.find({})
  }
}

export default RegionClass
