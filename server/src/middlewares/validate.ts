import { ZodObject } from 'zod'
import type { Request, Response, NextFunction } from 'express'
import { PARAM_METHODS } from '@/types/types.js'

export const validate =
  (schema: ZodObject, method: PARAM_METHODS = PARAM_METHODS.QUERY) =>
    (req: Request, res: Response, next: NextFunction): Response | void => {
      let params: Record<string, unknown> = req.query

      if (method === PARAM_METHODS.BODY) {
        params = req.body
      }

      if (method === PARAM_METHODS.PARAMS) {
        params = req.params
      }

      const result = schema.safeParse(params)

      if (!result.success) {
        return res.status(400).json({
          message: 'Validation Error',
          issues: result?.error?.issues
        })
      }

      req.data = result.data
      req.data.isFormat = result.data.isFormat !== undefined
      next()
    }
