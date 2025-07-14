import RegionInstance from '@/classes/region.instance.js'
import { Types, type ExpressFnParams } from '@/types/types.js'

export const createRegion: ExpressFnParams = async (req, res, next) => {
  const { name } = req.body

  try {
    const region = await RegionInstance.create({ name })

    return res.status(201).json({
      success: true,
      data: region
    })
  } catch (err) {
    return next(err)
  }
}

export const getRegions: ExpressFnParams = async (req, res, next) => {
  try {
    delete req.data.isFormat
    delete req.data.regionId
    delete req.data.provinceId
    delete req.data.municipalityId

    const regions = await RegionInstance.list(false, req.data)
    return res.status(200).json(regions)
  } catch (err) {
    return next(err)
  }
}

export const getRegionsFull: ExpressFnParams = async (req, res, next) => {
  const { isFormat, _id, regionId, provinceId, municipalityId } = req.data
  const id = regionId ?? _id

  const subQuery: Record<string, string> = {
    ...(provinceId && ({ provinceId: new Types.ObjectId(String(provinceId)) })),
    ...(municipalityId && ({ municipalityId: new Types.ObjectId(String(municipalityId)) }))
  }

  if (id) {
    req.data._id = new Types.ObjectId(String(id))
  }

  delete req.data.isFormat
  delete req.data.regionId
  delete req.data.provinceId
  delete req.data.municipalityId

  try {
    const regions = isFormat
      ? await RegionInstance.listAllFormatted(req.data, subQuery)
      : await RegionInstance.listAll(req.data)

    return res.status(200).json(regions)
  } catch (err) {
    return next(err)
  }
}
