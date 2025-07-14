import { ZodObject } from 'zod'
import type { Request, Response, NextFunction } from 'express'

export const validate =
  (schema: ZodObject) =>
    (req: Request, res: Response, next: NextFunction): Response | void => {
      const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params
      })

      if (!result.success) {
        return res.status(400).json({
          message: 'Validation Error',
          issues: result?.error?.issues
        })
      }

      next()
    }
