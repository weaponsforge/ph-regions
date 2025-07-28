import { ZodError, ZodObject } from 'zod'
import type { ZodIssue } from 'zod/v3'
import type { RequestHandler, Request, Response, NextFunction } from 'express'
import type { OptionsData } from '@/types/express.js'

import { ServerError } from '@/utils/error.js'
import { MongoIdSchema } from '@/schemas/common.schema.js'

import { PARAM_OPTIONS, type ServerErrorMessage } from '@/types/types.js'

/**
 * ExpressJS middleware that validates HTTP query parameters against a Zod schema.
 * - Passes the request to the next middleware or function if there are no validation errors.
 * - Throws and passes Errors to the global Error request handler if there are errors.
 * @param {ZodObject} schema Zod schema
 * @param {Request} req ExpressJS request object
 * @param {Response} res ExpressJS response object
 * @param {NextFunction} next ExpressJS next function
 * @returns {Response | void}
 * @throws {Error} Zod input validation errors
 */
export const validate = (schema: ZodObject): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      // Validate route parameters (e.g., MongoDB ObjectId in "/:id")
      MongoIdSchema.parse(req.params)

      // Validate query parameters
      const result = schema.safeParse(req.query)

      if (!result.success) {
        const messages = (result?.error?.issues as ZodIssue[]).map(
          (issue: ZodIssue) => `${issue.message?.replace(/"/g, '')} on ${issue.path.join('.')}`
        )

        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: messages,
          status: 400
        } as ServerErrorMessage)
      }

      // Store processed options data into "req.options"
      req.options = {} as OptionsData

      for (const keyValue of Object.values(PARAM_OPTIONS)) {
        if (result.data[keyValue]) {
          req.options[keyValue] = result.data[keyValue] as boolean
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
