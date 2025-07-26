import { z, ZodError, ZodObject } from 'zod'
import type { Request, Response, NextFunction } from 'express'
import { PARAM_METHODS } from '@/types/types.js'
import { ServerError } from '@/utils/error.js'
import { MongoIdSchema } from '@/schemas/common.schema.js'

export const validate = (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      MongoIdSchema.parse(req.params)
      const result = schema.safeParse(req.query)

      if (!result.success) {
        const issuesStr = result?.error?.issues
          .reduce((list: string, issue: Record<string, string>) =>
            list += issue.message, ''
        )

        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: issuesStr,
          status: 500
        })
      }

      next()
    } catch (err: any) {
      if (err instanceof ZodError) {
        return next(new ServerError(err.issues[0].message, 400))
      }

      next(err)
    }
}
