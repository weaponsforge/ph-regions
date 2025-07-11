import { ProvinceDataSchema } from "@/models/schemas.js"
import { type ExpressFnParams } from "@/types/types.js"

export const validateCreateProvince: ExpressFnParams = async (req, res, next) => {
  const { provinceId, regionId, name } = req.body

  const result = ProvinceDataSchema.safeParse({ provinceId, regionId, name })

  if (!result.success) {
    return res.status(500).send('Invalid parameters')
  }

  next()
}
