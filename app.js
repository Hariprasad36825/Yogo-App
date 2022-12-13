import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import {
  handleDatabaseError,
  handleDefaultError,
  handleValidationError
} from './middleware/errorHandler.middleware'
import { batchRouter } from './routes/batch.route'
import { EnrollmentRouter } from './routes/enrollment.routes'
import { UserRouter } from './routes/user.route'

dotenv.config()
const app = express()

app.use(bodyParser.json())

// cors configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// cors for development
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'test') {
  app.use(cors({ origin: true, credentials: true }))
} else {
  app.use(
    cors({
      origin: ['https://bend-it-over.onrender.com', 'http://127.0.0.1:8080'],
      credentials: true
    })
  )
}

app.get('/', (req, res) => {
  res.sendStatus(200)
})

// route
app.use('/api/user', UserRouter)
app.use('/api/batch', batchRouter)
app.use('/api/enrollments', EnrollmentRouter)

// error handlers
app.use(handleValidationError)
app.use(handleDatabaseError)
app.use(handleDefaultError)

export default app
