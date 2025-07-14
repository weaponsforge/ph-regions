import mongoose from 'mongoose'

import MongoCrudClass from './mongo.class.js'
import { ZodObject, Model } from '@/types/types.js'
import type { HydratedDocument, ZodRawShape } from '@/types/types.js'

import Municipality from '@/models/municipality.model.js'
import Province from '@/models/province.model.js'
import type { TRegionListParams } from '@/models/schemas.js'

const EXCLUDE_FIELDS = { __v: 0, createdAt: 0, updatedAt: 0 }

class RegionClass<T, Z extends ZodObject<ZodRawShape>> extends MongoCrudClass<T, Z> {
  constructor(model: Model<T>, schema: Z) {
    super(model, schema)
  }

  /** Lists all `Region` objects with nested `provinces` and `municipalities` data */
  async listAll(params: TRegionListParams = {}): Promise<HydratedDocument<T>[]> {
    this.checkInternals()

    return await this.model!.find(params)
      .select(EXCLUDE_FIELDS)
      .populate({
        path: 'provinces',
        select: EXCLUDE_FIELDS,
        populate: {
          path: 'municipalities',
          select: EXCLUDE_FIELDS
        }
      })
  }

  /**
   * Lists all `Region` objects with nested `provinces` and `municipalities` data and
   * formats the `_id` root document fields of the following:
   * @example
   * ```js
   * Region._id --> Region.regionId
   * Province._id --> Province.provinceId
   * Municipality._id --> Municipality.municipalityId
   * ```
   */
  async listAllFormatted(
    params: TRegionListParams = {},
    subParams: TRegionListParams = {}
  ): Promise<HydratedDocument<T>[]> {
    this.checkInternals()

    return await this.model!.aggregate([
      { $match: params },
      {
        $lookup: {
          from: 'provinces', // collection name - use the plural, lowercase form
          localField: '_id',
          foreignField: 'regionId',
          as: 'provinces'
        }
      },
      {
        $unwind: {
          path: '$provinces',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: subParams.provinceId
          ? { 'provinces._id': subParams.provinceId }
          : {}
      },
      {
        $lookup: {
          from: 'municipalities',
          localField: 'provinces._id',
          foreignField: 'provinceId',
          as: 'provinces.municipalities'
        }
      },
      {
        $match: subParams.municipalityId
          ? { 'provinces.municipalities._id': subParams.municipalityId }
          : {}
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          abbrev: { $first: '$abbrev' },
          regionalName: { $first: '$regionalName' },
          regionalCode: { $first: '$regionalCode' },
          provinces: { $push: '$provinces' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          __v: { $first: '$__v' }
        }
      },
      {
        $project: {
          regionId: '$_id',
          _id: 0,
          name: 1,
          abbrev: 1,
          regionalName: 1,
          regionalCode: 1,
          provinces: {
            $map: {
              input: '$provinces',
              as: 'province',
              in: {
                regionId: '$$province.regionId',
                provinceId: '$$province._id',
                name: '$$province.name',
                // municipalities: '$$province.municipalities'
                municipalities: {
                  $map: {
                    input: '$$province.municipalities',
                    as: 'municipality',
                    in: {
                      regionId: '$$municipality.regionId',
                      provinceId: '$$municipality.provinceId',
                      municipalityId: '$$municipality._id',
                      name: '$$municipality.name'
                    }
                  }
                }
              }
            }
          }
        }
      }
    ])
  }

  override async delete(id: string): Promise<void> {
    const session = await mongoose.startSession()

    try {
      await session.withTransaction(async () => {
        await this.model!.findByIdAndDelete(id).session(session)

        await Promise.all([
          Province.deleteMany({ regionId: id }).session(session),
          Municipality.deleteMany({ regionId: id }).session(session)
        ])
      })
    } finally {
      await session.endSession()
    }
  }
}

export default RegionClass
