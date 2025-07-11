import { type ExpressFnParams } from "@/types/types.js";
import ProvinceClass from "@/classes/province.class.js";

const Province = new ProvinceClass()

export const createProvince: ExpressFnParams = async (req, res, next) => {
  const { name, provinceId, regionId } = req.body

  try {
    const province = await Province.create({ name, provinceId, regionId })

    return res.status(201).json({
      success: true,
      data: province
    })
  } catch (err: any) {
    return res.status(500).send(err.message)
  }
}

export const getProvinces: ExpressFnParams = async (req, res, next) => {
  try {
    const provinces = await Province.getAll()

    return res.status(200).json({
      success: true,
      data: provinces
    })
  } catch (err: any) {
    return res.status(500).send(err.message)
  }
}
