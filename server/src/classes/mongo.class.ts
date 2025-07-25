import { ZodObject, Model } from '@/types/types.js'
import type { HydratedDocument, ZodRawShape } from '@/types/types.js'

/**
 * @class MongoCrudClass
 * @description This is a class that implements the MongoCRUD blueprint for interfacing with MongoDB
 */
class MongoCrudClass<T, Z extends ZodObject<ZodRawShape>> {
  /** Zod schema for data validation */
  schema: Z | null

  /** Mongoose schema (model) */
  model: Model<T> | null

  /**
   * @constructor Initializes the `MongoCrudClass` with a Mongoose Model and a Zod Schema
   * @param model - Mongoose Moodel
   * @param schema - Zod schema
   */
  constructor (model: Model<T>, schema: Z) {
    if (!model || !schema) {
      throw new Error('Model and schema are required')
    }

    this.model = model
    this.schema = schema
  }

  /** This method creates a new document */
  async create(params: Partial<T>): Promise<HydratedDocument<T>> {
    this.safeParse(params)
    return await this.model!.create(params)
  }

  /** This method updates a document by ID */
  async update(id: string, params: Partial<T>): Promise<HydratedDocument<T> | null> {
    this.safeParse(params)

    return await this.model!.findOneAndUpdate(
      { _id: id },
      params,
      { returnOriginal: false }
    )
  }

  /** This method deletes a document by ID */
  async delete(id: string): Promise<void | null> {
    this.checkInternals()
    return await this.model!.findByIdAndDelete(id)
  }

  /** This method returns all documents */
  async list(verbose: boolean = true, params: Partial<T> = {}): Promise<HydratedDocument<T>[]> {
    if (verbose) {
      return await this.model!.find(params)
    }

    return await this.model!
      .find(params)
      .select({ __v: 0, createdAt: 0, updatedAt: 0 })
  }

  /** This method returns a document/s by query parameters */
  async get(params: Partial<T> = {}): Promise<HydratedDocument<T> | null> {
    return await this.model!.findOne(params)
  }

  async getById(id: string): Promise<HydratedDocument<T> | null> {
    return await this.model!.findById(id)
  }

  /**
   * Checks if `this.schema` and `this.model` are present.
   * @throws {Error} Throws an error if `this.schema` or `this.model` is missing.
   */
  checkInternals () {
    if (!this.schema || !this.model) {
      throw new Error('Missing or schema are required')
    }
  }

  /**
   * Parses input parameters for valid type-checks and required input parameters
   * @param params Key-value pairs properties of `T`
   * @throws Zod validation and parsing errors
   */
  safeParse(params: Partial<T>) {
    const result = this.schema!.safeParse(params)

    if (!result.success) {
      throw new Error('Invalid data format', params)
    }

    return result
  }
}

export default MongoCrudClass
