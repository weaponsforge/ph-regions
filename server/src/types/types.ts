import type { NextFunction, Request, Response } from 'express'
export { type HydratedDocument, Model, Types, Query } from 'mongoose'
export type { Document } from 'mongoose'
export { ZodObject, type ZodRawShape } from 'zod'

import { ServerError } from '@/utils/error.js'

export type ExpressFnParamsFull = (
  err: Error | ServerError, req: Request, res: Response, next: NextFunction
) => void;

export type ExpressFnParams = (
  req: Request, res: Response, next: NextFunction
) => void;

/** API query options */
export enum PARAM_OPTIONS {
  /** Flag to display the Mongo-specific fields eg., `_id`, `__v`, `createdDate` etc */
  INCLUDE_META = 'includeMeta'
}

/** HTTP request objects in the Express `req` object */
export enum PARAM_METHODS {
  BODY = 'body',
  PARAMS = 'params',
  QUERY = 'query'
}

/** Server error response type */
export interface ServerErrorMessage {
  success: boolean;
  error: string;
  message: string[];
  status: number;
}
