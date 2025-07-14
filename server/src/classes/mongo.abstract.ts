import { ZodObject } from '@/types/types.js'
import type { HydratedDocument, ZodRawShape } from '@/types/types.js'
import { Model } from '@/types/types.js'

/**
 * @class MongoCRUD
 * @description This is an abstract class to be implemented by classes that interface with MongoDB
 */
abstract class MongoCRUD<T, Z extends ZodObject<ZodRawShape>> {
  /** Zod schema for data validation */
  schema: Z | null

  /** Mongoose schema (model) */
  model: Model<T> | null

  constructor (model: Model<T>, schema: Z) {
    if (!model || !schema) {
      throw new Error('Model and schema are required')
    }

    this.model = model
    this.schema = schema
  }

  /** This method creates a new document */
  abstract create(params: T): Promise<HydratedDocument<T>>;

  /** This method updates a document by ID */
  abstract update(id: string, params: Partial<T>): Promise<HydratedDocument<T> | null>;

  /** This method deletes a document by ID */
  abstract delete(id: string): Promise<void | null>;

  /** This method returns all documents */
  abstract list(verbose: boolean, params: Partial<T>): Promise<HydratedDocument<T>[]>;

  /** This method returns a document by ID */
  abstract get(id: string): Promise<HydratedDocument<T> | null>;

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
    this.checkInternals()
    const result = this.schema!.safeParse(params)

    if (!result.success) {
      throw new Error('Invalid data format', params)
    }

    return result
  }
}

export default MongoCRUD
