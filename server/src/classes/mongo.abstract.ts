import { HydratedDocument, Model } from 'mongoose'
import { AnyZodObject } from 'zod'

/**
 * @class MongoCRUD
 * @description This is an abstract class to be implemented by classes that interface with MongoDB
 */
abstract class MongoCRUD<T extends AnyZodObject> {
  /** Zod schema for data validation */
  schema: AnyZodObject | null;
  model: Model<T> | null;

  constructor (model: Model, schema: AnyZodObject) {
    this.model = model
    this.schema = schema
  }

  /** This method creates a new document */
  abstract create(params: T): Promise<HydratedDocument<T>>;

  /** This method updates a document by ID */
  abstract update(id: string, params: Partial<T>): Promise<HydratedDocument<T> | null>;

  /** This method deletes a document by ID */
  abstract delete(id: string): Promise<void>;

  /** This method returns all documents */
  abstract list(verbose: boolean): Promise<HydratedDocument<T>[]>;

  /** This method returns a document by ID */
  abstract get(id: string): Promise<HydratedDocument<T> | null>;

  /**
   * Parses input parameters for valid type-checks and required input parameters
   * @param params Key-value pairs properties of `T`
   * @throws Zod validation and parsing errors
   */
  safeParse(params: Partial<T>) {
    const resutlt = this.schema.safeParse(params)

    if (!resutlt.success) {
      throw new Error('Invalid data format')
    }
  }
}

export default MongoCRUD
