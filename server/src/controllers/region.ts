import { type ExpressFnParams } from "@/types/types.js";
import RegionClass from "@/classes/region.instance.js";

export const createRegion: ExpressFnParams = async (req, res, next) => {
  const { name, regionId } = req.body

  try {
    const region = await RegionClass.create({ name, regionId })

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
    const regions = await RegionClass.list()

    return res.status(200).json({
      success: true,
      data: regions
    })
  } catch (err: any) {
    return res.status(500).send(err.message)
  }
}
