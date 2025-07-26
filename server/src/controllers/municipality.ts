import MongoCrudClass from '@/classes/mongo.class.js'
import Municipality from '@/models/municipality.model.js'
import { ServerError } from '@/utils/error.js'

import type { ExpressFnParams } from '@/types/types.js'

const MunicipalityInstace = new MongoCrudClass(Municipality)

/** Returns a collection of municipalities */
export const getMunicipalities: ExpressFnParams = async (req, res, next) => {
  const { includeMeta, regionId, provinceId, ...rest } = req.query

  if (!regionId && !provinceId) {
    throw new ServerError('regionId or provinceId required', 500)
  }

  const params = {
    ...rest,
    ...(regionId && ({ regionId })),
    ...(provinceId && ({ provinceId }))
  }

  try {
    const data = await MunicipalityInstace.getDocs(params, includeMeta)
    const total = data?.length || 0

    return res.status(200).json({
      success: true,
      total,
      metadata: {
        description: 'List of Philippine municipalities',
        source: 'PAGASA Seasonal Rainfall Analysis Table (regions and provinces) and 10-Day Weather Forecast Excel file (provinces and municipalities)'
      },
      data
    })
  } catch (err) {
    return next(err)
  }
}

/** Returns a municipality by ID */
export const getMunicipalityById: ExpressFnParams = async (req, res, next) => {
  const { includeMeta } = req.query
  const { id: municipalityId } = req.params

  try {
    const data = await MunicipalityInstace.getDocById(municipalityId, includeMeta)

    if (!data) {
      throw new ServerError('Municipality not found', 404)
    }

    return res.status(200).json({
      success: true,
      metadata: {
        description: 'Philippine municipality information',
        source: 'PAGASA Seasonal Rainfall Analysis Table (regions and provinces) and 10-Day Weather Forecast Excel file (provinces and municipalities)'
      },
      data
    })
  } catch (err: any) {
    return next(err)
  }
}
