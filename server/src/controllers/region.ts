import { type ExpressFnParams } from "@/types/types.js";
import RegionClass from "@/classes/region.class.js";

const Region = new RegionClass()

export const createRegion: ExpressFnParams = async (req, res, next) => {
  const { name, regionId } = req.body

  try {
    const region = await Region.create({ name, regionId })

    return res.status(201).json({
      success: true,
      data: region
    })
  } catch (err: any) {
    return res.status(500).send(err.message)
  }
}

export const getRegions: ExpressFnParams = async (req, res, next) => {
  try {
    const regions = await Region.getAll()

    return res.status(200).json({
      success: true,
      data: regions
    })
  } catch (err: any) {
    return res.status(500).send(err.message)
  }
}
