import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import type { ExpressFnParamsFull, ExpressFnParams } from './types/types.js'
import { errorHasStatus, typedCatchError } from './utils/error.js'
import { corsOptions } from './utils/corsOptions.js'
import { directory } from './utils/helpers.js'
import { connectDbServerless } from '@/middleware/connectServerless.js'

import './utils/db.js'
import apiRoutes from './routes/index.js'

dotenv.config()
const app = express()
const _dirname = directory(import.meta.url)

// Initialize the express app
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve(_dirname, '../public')))

if (process.env.ALLOW_ALL_ORIGINS === '1') {
  // Allow requests from all origins
  app.use(cors({ origin: '*' }))
} else if (process.env.ALLOW_CORS === '1') {
  // CORS-enabled routes with whitelisted domains
  app.use(cors(corsOptions))
}

// Ensure consistent MongoDB connection in serverless platforms
if (process.env.DEPLOYMENT_PLATFORM === 'vercel') {
  app.use('/api', connectDbServerless)
}

// Not found 404 route handler
const notFoundHandler: ExpressFnParams = (req, res) => {
  return res.status(404).json({
    success: false,
    error: 'Route not found',
    message: [`Cannot ${req.method} ${req.originalUrl}`],
    status: 404
  })
}

// Request error handler
const errorHandler: ExpressFnParamsFull = (err, _req, res, _next) => {
  const statusCode = errorHasStatus(err) ? err.status : 500

  return res.status(statusCode).json({
    success: false,
    error: 'Internal server error',
    message: [typedCatchError(err) || 'Internal server error'],
    status: statusCode
  })
}

app.use('/api', apiRoutes)

// Register error handlers
app.use(notFoundHandler)
app.use(errorHandler)

export default app
