import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
const db = mongoose.connection

if (db.readyState !== 1) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

  db.on('error', console.error.bind(console, 'connection error: '))
  db.once('open', () => {
    console.log('connected to mongodb')
  })
}

export default db
