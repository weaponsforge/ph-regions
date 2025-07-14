import MunicipalityInstance from '@/classes/municipality.instance.js'
import { type ExpressFnParams } from '@/types/types.js'

export const createMunicipality: ExpressFnParams = async (req, res, next) => {
  const { name, provinceId, regionId } = req.body

  try {
    const municipality = await MunicipalityInstance.create({
      name,
      provinceId,
      regionId
    })

    return res.status(201).json({
      success: true,
      data: municipality
    })
  } catch (err) {
    return next(err)
  }
}

export const getMunicipalities: ExpressFnParams = async (req, res, next) => {
  try {
    const municipalities = await MunicipalityInstance.list(false)
    return res.status(200).json(municipalities)
  } catch (err) {
    return next(err)
  }
}
