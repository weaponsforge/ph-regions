import ProvinceClass from '@/classes/province.instance.js'
import { type ExpressFnParams } from '@/types/types.js'

export const createProvince: ExpressFnParams = async (req, res, next) => {
  const { name, regionId } = req.body

  try {
    const province = await ProvinceClass.create({ name, regionId })

    return res.status(201).json({
      success: true,
      data: province
    })
  } catch (err) {
    return next(err)
  }
}

export const getProvinces: ExpressFnParams = async (req, res, next) => {
  try {
    const provinces = await ProvinceClass.list(false)
    return res.status(200).json(provinces)
  } catch (err) {
    return next(err)
  }
}
