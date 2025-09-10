import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

import type { Request, Response, NextFunction } from 'express'
import { ServerError } from '@/utils/error.js'
import { connectDb } from '@/utils/db.js'

/**
 * Add this middleware before serverless routes to ensure
 * consistent DB connection
 */
export const connectDbServerless = async (
  req: Request, res: Response, next: NextFunction
): Promise<Response | void> => {

  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDb()
    }

    next()
  } catch (error) {
    const errMsg = 'Database connection failed'

    console.error(`${errMsg}:`, error)
    return next(new ServerError(errMsg, 500))
  }
}
