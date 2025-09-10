import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

/** MongoDB connection */
const db = mongoose.connection

/**
 * Logs the status of MongoDB connections
 */
async function checkConnections() {
  // Print the total number of connections Mongoose is managing
  console.log(`Total connections: ${mongoose.connections.length}`)

  // Loop through each connection
  mongoose.connections.forEach((conn: mongoose.Connection, index: number) => {
    let state = 'unknown'
    switch (conn.readyState) {
    case 0: state = 'disconnected'; break
    case 1: state = 'connected'; break
    case 2: state = 'connecting'; break
    case 3: state = 'disconnecting'; break
    }
    console.log(`Connection no. ${index}: ${state}`)
  })
}

/**
 * Initializes a connection to the MongoDB.
 * @example
 * ```
 * connectDb().then(() => {
 *   // Code here
 * })
 * ```
 */
const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is undefined')
    }

    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    })

    db
      .on('error', (err) => console.error('❌ Mongoose connection error:', err))
      .on('disconnected', () => console.log('⚠️  Mongoose disconnected from MongoDB'))
      .once('open', () => console.log('✅ Mongoose connected to MongoDB'))

    process.on('SIGINT', async () => {
      await db.close()
      console.log('MongoDB connection closed through app termination')
      process.exit(0)
    })

    console.log('✅ MongoDB connected')
    checkConnections()
  } catch (_error) {
    console.error('❌ MongoDB connection error', _error)
    throw _error
  }
}

/** Disconnects the connection from the MongoDB */
const disconnectDb = () => {
  mongoose.connection.removeAllListeners()
  mongoose.connection.close()
}

export {
  db,
  connectDb,
  disconnectDb
}
