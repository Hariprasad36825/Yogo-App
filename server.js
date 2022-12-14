import dotenv from 'dotenv'
import app from './app'
import { sequelize } from './config/db_config'
import { Batch } from './models/batch.model'
import { Enrollment } from './models/enrollment.model'
import { createBatch } from './services/batch.services'
dotenv.config()

// Constants
const env = process.env.NODE_ENV
const PORT = 8080
const HOST = '127.0.0.1'

// App
sequelize.authenticate().then(async () => {
  // sync db
  Batch.hasMany(Enrollment)
  Enrollment.belongsTo(Batch, { foreignKey: 'batch' })
  await sequelize.sync({ force: true })
  await createBatch('6.00 - 7.00 AM')
  await createBatch('7.00 - 8.00 AM')
  await createBatch('9.00 - 10.00 AM')
  await createBatch('5.00 - 6.00 PM')
  if (env === 'test') {
    app.listen(PORT, HOST)
    console.log(`connection establised on ${HOST}:${PORT}`)
  } else {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`)
    })
  }
})
