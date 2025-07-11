import dotenv from 'dotenv'
import app from './app.js'
import { connectDb } from './utils/db.js'

dotenv.config()
const PORT = process.env.PORT || 3001

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})


