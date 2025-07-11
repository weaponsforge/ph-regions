import Province from "@/models/province.model.js"
import { ProvinceDataSchema, type TProvince } from "@/models/schemas.js"

class ProvinceClass {
  /** Create a new Province */
  async create (params: TProvince) {
    try {
      const resutlt = ProvinceDataSchema.safeParse(params)

      if (!resutlt.success) {
        throw new Error('Invalid data format')
      }

      return await new Province(params).save()
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  /** Get all Provinces */
  async getAll () {
    return await Province.find({})
  }
}

export default ProvinceClass
