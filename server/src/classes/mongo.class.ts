import { Model, Query } from '@/types/types.js'
import type { HydratedDocument, Document } from '@/types/types.js'

interface QueryOptionsLocal {
  /** Flag to return full Mongoose documents or lean ones */
  isLean?: boolean;
  /** Flag to strip the Mongo fields like `_id`, `__v`, `createdAt`, etc */
  includeMeta?: boolean;
}

const defaultOptions: QueryOptionsLocal = {
  isLean: false,
  includeMeta: true
}

/**
 * @class MongoCrudClass
 * @description This is a class that implements the MongoCRUD blueprint for interfacing with MongoDB
 */
class MongoCrudClass<T> {
  /** Mongoose schema (model) */
  readonly model: Model<T> | null

  /**
   * @constructor Initializes the `MongoCrudClass` with a Mongoose Model
   * @param model - Mongoose Model
   */
  constructor (model: Model<T>) {
    if (!model) {
      throw new Error('Mongoose model is required')
    }

    this.model = model
    Object.freeze(this)
  }

  /**
   * Applies optional Mongoose query options to an initial Query object
   * @param {Query} query Mongoose `Query` object
   * @param {QueryOptionsLocal} options - Local query options
   * @returns {Query} Customized Mongoose `Query` object
   */
  buildQuery <T, DocType>(
    query: Query<T, DocType>,
    options: QueryOptionsLocal = defaultOptions
  ): Query<T, DocType> {
    if (!options.includeMeta || false) {
      query.select({ __v: 0, createdAt: 0, updatedAt: 0 })
    }

    if (options?.isLean) {
      query.lean({ id: false })
    }

    return query
  }

  async getDocById (
    id: string,
    options: QueryOptionsLocal = defaultOptions
  ): Promise<
    HydratedDocument<T> | Document<T> | null
  > {
    const opts = { ...defaultOptions, ...options }
    const query = this.buildQuery(this.model!.findById(id), opts)

    return await query
  }

  async getDocByParams (
    params: Partial<T>,
    options: QueryOptionsLocal = defaultOptions
  ): Promise<
    HydratedDocument<T> | Document<T> | null
  > {
    const opts = { ...defaultOptions, ...options }
    const query = this.buildQuery(this.model!.findOne(params), opts)

    return await query
  }

  /**
   * Gets documents from the collection based on provided query parameters.
   *
   * @template T
   * @param {Partial<T>} [params={}] - The query parameters
   * @param {false} includeMeta - Flag to return full Mongoose documents or lean ones
   * @returns {Promise<HydratedDocument<T>[] | Document<T>[]>}
   *  Promise that resolves into a collection of Mongoose documents or lean (plain JSON) documents
   */
  async getDocs (
    params: Partial<T> = {},
    options: QueryOptionsLocal = defaultOptions
  ): Promise<
    HydratedDocument<T>[] | Document<T>[]
  > {
    const opts = { ...defaultOptions, ...options }
    const query = this.buildQuery(this.model!.find(params), opts)

    return await query
  }
}

export default MongoCrudClass
