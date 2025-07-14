import type { NextFunction, Request, Response } from 'express'
export { type HydratedDocument, Model, Types } from 'mongoose'
export { ZodObject, type ZodRawShape } from 'zod'

import { ServerError } from '@/utils/error.js'

export type ExpressFnParamsFull = (
  err: Error | ServerError, req: Request, res: Response, next: NextFunction
) => void;

export type ExpressFnParams = (
  req: Request, res: Response, next: NextFunction
) => void;
