import app from './app'
import { sequelize } from './config/db_config'

// Constants
const PORT = 8080
const HOST = '127.0.0.1'

// App
sequelize.authenticate().then(async () => {
  // sync db
  await sequelize.sync()

  app.listen(PORT, HOST)
  console.log(`connection establised on ${HOST}:${PORT}`)
})
