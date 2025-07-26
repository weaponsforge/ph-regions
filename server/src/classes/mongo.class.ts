import { Model } from '@/types/types.js'
import type { HydratedDocument, Document } from '@/types/types.js'

/**
 * @class MongoCrudClass
 * @description This is a class that implements the MongoCRUD blueprint for interfacing with MongoDB
 */
class MongoCrudClass<T> {
  /** Mongoose schema (model) */
  readonly model: Model<T> | null

  /**
   * @constructor Initializes the `MongoCrudClass` with a Mongoose Model and a Zod Schema
   * @param model - Mongoose Moodel
   */
  constructor (model: Model<T>) {
    if (!model) {
      throw new Error('Mongoose model is required')
    }

    this.model = model
    Object.freeze(this)
  }

  async getDocById(id: string, isFull: true): Promise<HydratedDocument<T> | null>;
  async getDocById(id: string, isFull: false): Promise<Document<T> | null>;
  async getDocById (id: string, isFull: boolean): Promise<HydratedDocument<T> | Document<T> | null> {
    const query = this.model!.findById(id)

    if (!isFull) {
      query
        .select({ __v: 0, createdAt: 0, updatedAt: 0 })
        .lean()
    }

    return await query
  }

  async getDocs (params: Partial<T>, isFull: true): Promise<HydratedDocument<T>[]>;
  async getDocs (params: Partial<T>, isFull: false): Promise<Document<T>[]>;
  async getDocs (params: Partial<T> = {}, isFull: boolean): Promise<HydratedDocument<T>[] | Document<T>[]> {
    const query = this.model!.find(params)

    if (!isFull) {
      query
        .select({ __v: 0, createdAt: 0, updatedAt: 0 })
        .lean()
    }

    return await query
  }
}

export default MongoCrudClass
