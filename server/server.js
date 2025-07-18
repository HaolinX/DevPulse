import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config.js'
import authRoutes from './routes/auth.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('✅ DevPulse backend is running with MongoDB')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})