import dotenv from 'dotenv'
import app from './app'
import { sequelize } from './config/db_config'
dotenv.config()

// Constants
const env = process.env.NODE_ENV
const PORT = 8080
const HOST = '127.0.0.1'

// App
sequelize.authenticate().then(async () => {
  // sync db
  await sequelize.sync()
  if (env === 'test') {
    app.listen(PORT, HOST)
    console.log(`connection establised on ${HOST}:${PORT}`)
  } else {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`)
    })
  }
})
