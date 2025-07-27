import { ZodError, ZodObject } from 'zod'
import { ServerError } from '@/utils/error.js'
import { MongoIdSchema } from '@/schemas/common.schema.js'

import type { Request, Response, NextFunction } from 'express'
import { PARAM_OPTIONS, type ServerErrorMessage } from '@/types/types.js'
import type { ZodIssue } from 'zod/v3'

export const validate = (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      MongoIdSchema.parse(req.params)
      const result = schema.safeParse(req.query)

      if (!result.success) {
        const issues = (result?.error?.issues as ZodIssue[])
          .reduce((list: string[], issue) => {
            const errMsg = `${issue?.message} on ${issue?.path[0]}`
            const unknownMsg = 'Unknown validation error'
            const msg = issue?.message ? errMsg : unknownMsg
            return [...list, msg]
          }, [])

        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: issues,
          status: 500
        } as ServerErrorMessage)
      }

      // Store processed options data
      for (const keyValue of Object.values(PARAM_OPTIONS)) {
        req.options = {}

        if (result.data[keyValue]) {
          req.options[keyValue] = result.data[keyValue]
        }
      }

      next()
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const errMsg = err.issues[0]?.message || 'Unknown validation error'
        return next(new ServerError(errMsg, 400))
      }

      next(err)
    }
  }
