import mongoose, { HydratedDocument, Model } from 'mongoose'
import { AnyZodObject } from 'zod'
import MongoCRUD from './mongo.abstract.js';

/**
 * @class MongoCrudClass
 * @description This is a class that implements the MongoCRUD blueprint for interfacing with MongoDB
 */
class MongoCrudClass<T extends AnyZodObject> extends MongoCRUD<T> {
  constructor (model: Model, schema: AnyZodObject) {
    super(model, schema)
  }

  async create(params: T): Promise<HydratedDocument<T>> {
    this.safeParse(params)
    return await this.model.create(params)
  }

  async update(id: string, params: Partial<T>): Promise<HydratedDocument<T> | null> {
    this.safeParse(params)

    return await this.model.findOneAndUpdate(
      { _id: id },
      params,
      { returnOriginal: false }
    )
  }

  async delete(id: string): Promise<void> {
    return await this.model.findByIdAndDelete(id)
  }

  async list(verbose: boolean = true): Promise<HydratedDocument<T>[]> {

    if (verbose) {
      return await this.model.find({});
    }

    return await this.model
      .find({})
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
  }

  async get(id: string): Promise<HydratedDocument<T> | null> {
    return await this.model.findById(id)
  }
}

export default MongoCrudClass
