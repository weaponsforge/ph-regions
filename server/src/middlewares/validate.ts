import { ZodError, ZodObject } from 'zod'
import { ServerError } from '@/utils/error.js'
import { MongoIdSchema } from '@/schemas/common.schema.js'

import type { Request, Response, NextFunction } from 'express'
import { PARAM_OPTIONS } from '@/types/types.js'

export const validate = (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      MongoIdSchema.parse(req.params)
      const result = schema.safeParse(req.query)

      if (!result.success) {
        const issuesStr = result?.error?.issues
          .reduce((list: string, issue: any) =>
            list += issue?.message || 'Unknown validation error', ''
        )

        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: issuesStr,
          status: 500
        })
      }

      // Store processed options data
      for (const keyValue of Object.values(PARAM_OPTIONS)) {
        req.options = {}

        if (result.data[keyValue]) {
          req.options[keyValue] = result.data[keyValue]
        }
      }

      next()
    } catch (err: any) {
      if (err instanceof ZodError) {
        let errMsg = err.issues[0]?.message || 'Unknown validation error'
        return next(new ServerError(errMsg, 400))
      }

      next(err)
    }
}
