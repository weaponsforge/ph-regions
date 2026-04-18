import MongoCrudClass from '@/classes/mongo.class.js'
import Municipality from '@/models/municipality.model.js'
import { ServerError } from '@/utils/error.js'

import type { ExpressFnParams } from '@/types/types.js'
import { FULL_API_METADATA } from '@/utils/constants.js'

const MunicipalityInstance = new MongoCrudClass(Municipality)
const description = 'List of Philippine municipalities'

/** Returns a collection of municipalities */
export const getMunicipalities: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { includeMeta: _, regionId, provinceId, ...rest } = req.query

  if (!regionId && !provinceId) {
    throw new ServerError('regionId or provinceId required', 400)
  }

  const params = {
    ...rest,
    ...(regionId && ({ regionId: String(regionId) })),
    ...(provinceId && ({ provinceId: String(provinceId) })),
  }

  try {
    const data = await MunicipalityInstance.getDocs(params, { includeMeta, isLean: true })
    const total = data?.length || 0

    return res.status(200).json({
      success: true,
      total,
      metadata: { ...FULL_API_METADATA, description },
      data,
    })
  } catch (err) {
    return next(err)
  }
}

/** Returns a municipality by ID */
export const getMunicipalityById: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.options
  const { id: municipalityId } = req.params

  try {
    const data = await MunicipalityInstance.getDocById(municipalityId!, { includeMeta, isLean: true })

    if (!data) {
      throw new ServerError('Municipality not found', 404)
    }

    return res.status(200).json({
      success: true,
      total: 1,
      metadata: { ...FULL_API_METADATA, description },
      data,
    })
  } catch (err: unknown) {
    return next(err)
  }
}
