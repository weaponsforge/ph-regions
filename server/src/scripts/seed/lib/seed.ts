import type { Model } from '@/types/types.js'
import type { DMunicipality, DProvince, DRegion } from './normalize.js'
import type { TProvinceData, TRegionData, TMunicipality } from '@/models/schemas.js'
import type { ClientSession } from 'mongoose'

type MinData = DRegion | DProvince | DMunicipality
type FullData = TRegionData | TProvinceData | TMunicipality

// Type alias for the return type
export type SeedingRecord = Record<string, string>
export type SeedingResult = SeedingRecord | Partial<MinData>

export type SeedOptions = {
  isReturnMapping?: boolean;
  isReturnRaw?: boolean;
  session?: ClientSession
}

/**
 * Inserts normalized data into the `regions`, `provinces` or the `municipalities` collections.
 * @param {Model<TDocument>} model - Mongoose model for the collection
 * @param {TInput[]} data - Array of objects for creating documents from the model
 * @param {SeedOptions} options - (Optional) Object containing custom options for seeding data
 * @param {boolean} [options.isReturnMapping=false] - (Optional) Flag to return a mapping of document `name` values to IDs. Defaults to `false`
 * @param {boolean} [options.isReturnRaw] - (Optional) Flag to return the original, raw inserted data.
 * @param {ClientSession} [options.session] - (Optional) MongoDB session - if provided, requires session setup from the calling method
 * @returns {Promise<SeedingResult | void>} Promise that resolves to a mapping object with document names as keys and document IDs as values, or void if `isReturnMapping` is false
 */
export const seed = async <
  TInput extends MinData,
  TDocument extends FullData
>(
  model: Model<TDocument>,
  data: TInput[],
  options: SeedOptions = {}
): Promise<SeedingResult | void> => {
  const { isReturnMapping, isReturnRaw = false, session } = options

  await model.deleteMany({}, { session })

  const insertedDocs = await model.insertMany(data, {
    ordered: false,
    rawResult: true,
    session
  })

  console.log(`---inserted ${insertedDocs.insertedCount} ${model.modelName} docs`)

  if (isReturnRaw) {
    return insertedDocs.mongoose.results.map((doc: TDocument) =>
      typeof doc.toObject === 'function'
        ? doc.toObject()
        : doc
    )
  }

  if (isReturnMapping) {
    return (insertedDocs?.mongoose?.results as TDocument[])?.reduce((list, item) => {
      if (item._id === undefined) return list
      return { ...list, [item.name]: item._id.toString() }
    }, {})
  }
}
