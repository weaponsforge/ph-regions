import MongoCrudClass from './mongo.class.js'
import { ZodObject, Model } from '@/types/types.js'
import type { HydratedDocument, ZodRawShape } from '@/types/types.js'

class ProvinceClass<T, Z extends ZodObject<ZodRawShape>> extends MongoCrudClass<T, Z> {
  constructor(model: Model<T>, schema: Z) {
    super(model, schema)
  }

  async listAll(): Promise<HydratedDocument<T>[]> {
    this.checkInternals()

    return await this.model!.find({})
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
      .populate('municipalities')
  }
}

export default ProvinceClass
