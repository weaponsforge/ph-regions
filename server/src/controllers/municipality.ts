import { type ExpressFnParams } from "@/types/types.js";
import MunicipalityClass from "@/classes/municipality.instance.js";

export const createMunicipality: ExpressFnParams = async (req, res, next) => {
  const { name, provinceId, regionId, municipalityId } = req.body

  try {
    const municipality = await MunicipalityClass.create({
      name,
      provinceId,
      regionId,
      municipalityId
    })

    return res.status(201).json({
      success: true,
      data: municipality
    })
  } catch (err: any) {
    return res.status(500).send(err.message)
  }
}

export const getMunicipalities: ExpressFnParams = async (req, res, next) => {
  try {
    const municipalities = await MunicipalityClass.list()

    return res.status(200).json({
      success: true,
      data: municipalities
    })
  } catch (err: any) {
    return res.status(500).send(err.message)
  }
}
