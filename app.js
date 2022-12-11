import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import {
  handleDatabaseError,
  handleDefaultError,
  handleValidationError
} from './middleware/errorHandler.middleware'
import { batchRouter } from './routes/batch.route'
import { EnrollmentRouter } from './routes/enrollment.routes'
import { UserRouter } from './routes/user.route'
import { OK } from './statusCodes'

const app = express()

app.use(bodyParser.json())

// cors configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested, Content-Type, Accept Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE')
    return res.status(OK).json({})
  }
  next()
})

// cors for development
if (process.env.NODE_ENV === 'test') {
  app.use(cors({ origin: true, credentials: true }))
} else {
  app.use(
    cors({
      origin: 'https://bend-it-over.onrender.com'
    })
  )
}

// route
app.use('/api/user', UserRouter)
app.use('/api/batch', batchRouter)
app.use('/api/enrollments', EnrollmentRouter)

// error handlers
app.use(handleValidationError)
app.use(handleDatabaseError)
app.use(handleDefaultError)

export default app
