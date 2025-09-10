import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

import type { Request, Response, NextFunction } from 'express'
import { ServerError } from '@/utils/error.js'
import { connectDb } from '@/utils/db.js'

let connectionPromise: Promise<unknown> | null = null

/**
 * Add this middleware before serverless routes to ensure
 * consistent MongoDB connection
 */
export const connectDbServerless = async (
  req: Request, res: Response, next: NextFunction
): Promise<Response | void> => {

  try {
    // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
    if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
      if (!connectionPromise) {
        connectionPromise = connectDb().finally(() => {
          connectionPromise = null
        })
      }

      await connectionPromise
    }

    next()
  } catch (error) {
    const errMsg = 'Database connection failed'

    console.error(`${errMsg}:`, error)
    return next(new ServerError(errMsg, 500))
  }
}
