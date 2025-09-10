import app from './app.js'
import { initializeConfig } from './utils/initEnv.js'
import { connectDb } from './utils/db.js'

initializeConfig()
const PORT = process.env.PORT || 3001

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
})
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err)
    process.exit(1)
  })
