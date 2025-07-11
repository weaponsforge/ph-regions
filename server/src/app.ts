import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'

import { corsOptions } from './utils/corsOptions.js';
import { type ExpressFnParamsFull } from './types/types.js';

dotenv.config()
const app = express();

import apiRoutes from '@/routes'

/*
const limiter = rateLimit({
  windowMs: process.env.API_WINDOW_MS_MINUTES * 60 * 1000, // in minutes
  max: process.env.API_RATE_LIMIT, // limit each IP to API_RATE_LIMIT requests per windowMs
  message: 'Too many requests from this IP. Please try again after 15 minutes.'
})
*/

// Initialize the express app
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

if (process.env.ALLOW_CORS === "1") {
  // app.use(cors(corsOptions))
  app.use(cors())
}

app.use('/api', apiRoutes)

const defaultRoute: ExpressFnParamsFull = (req, res, next) => {
  return res.status(200).send('Welcome to the Todo API')
}

const errorHandler: ExpressFnParamsFull = (err, req, res, next) => {
  return res.status(500).send(err.message)
}

app.get('/')

app.get('/', defaultRoute)
app.use(errorHandler)

export default app
