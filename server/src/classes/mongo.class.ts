import { ZodObject } from '@/types/types.js';
import { type HydratedDocument, Model } from '@/types/types.js';
import MongoCRUD from './mongo.abstract.js';

/**
 * @class MongoCrudClass
 * @description This is a class that implements the MongoCRUD blueprint for interfacing with MongoDB
 */
class MongoCrudClass<T, Z extends ZodObject<any>> extends MongoCRUD<T, Z> {
  constructor (model: Model<T>, schema: Z) {
    super(model, schema)
  }

  async create(params: Partial<T>): Promise<HydratedDocument<T>> {
    this.safeParse(params)
    return await this.model!.create(params)
  }

  async update(id: string, params: Partial<T>): Promise<HydratedDocument<T> | null> {
    this.safeParse(params)

    return await this.model!.findOneAndUpdate(
      { _id: id },
      params,
      { returnOriginal: false }
    )
  }

  async delete(id: string): Promise<void | null> {
    this.checkInternals()
    return await this.model!.findByIdAndDelete(id)
  }

  async list(verbose: boolean = true): Promise<HydratedDocument<T>[]> {
    this.checkInternals()

    if (verbose) {
      return await this.model!.find({});
    }

    return await this.model!
      .find({})
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
  }

  async get(id: string): Promise<HydratedDocument<T> | null> {
    this.checkInternals()
    return await this.model!.findById(id)
  }
}

export default MongoCrudClass
