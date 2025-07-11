import { RegionDataSchema } from "@/models/schemas.js"
import { type ExpressFnParams } from "@/types/types.js"

export const validateCreateRegion: ExpressFnParams = async (req, res, next) => {
  const { regionId, name } = req.body

  const result = RegionDataSchema.safeParse({ regionId, name })

  if (!result.success) {
    return res.status(500).send('Invalid parameters')
  }

  next()
}
