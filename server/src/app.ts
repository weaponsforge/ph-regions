import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import type { ExpressFnParamsFull, ExpressFnParams } from './types/types.js'
import { errorHasStatus, typedCatchError } from './utils/error.js'
import { corsOptions } from './utils/corsOptions.js'

dotenv.config()
const app = express()

import apiRoutes from './routes/index.js'

// Initialize the express app
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

if (process.env.ALLOW_CORS === '1') {
  app.use(cors(corsOptions))
}

const defaultRoute: ExpressFnParams = (req, res) => {
  return res.status(200).send('Welcome to the Todo API')
}

// Not found 404 route handler
const notFoundHandler: ExpressFnParams = (req, res) => {
  return res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    status: 404
  })
}

// Request error handler
const errorHandler: ExpressFnParamsFull = (err, req, res) => {
  const statusCode = errorHasStatus(err) ? err.status : 500

  return res
    .status(statusCode)
    .json({
      error: 'Internal server error',
      message: typedCatchError(err),
      status: statusCode
    })
}

app.get('/', defaultRoute)
app.use('/api', apiRoutes)

// Register error handlers
app.use(notFoundHandler)
app.use(errorHandler)

export default app
