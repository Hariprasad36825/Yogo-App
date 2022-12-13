import dotenv from 'dotenv'
import Sequelize from 'sequelize'
dotenv.config()

const env = process.env.NODE_ENV
const db = process.env.DB
const username = process.env.username
const password = process.env.password

export let sequelize

if (env === 'test') {
  sequelize = new Sequelize('sqlite::memory')
} else {
  sequelize = new Sequelize(db, username, password, {
    dialect: 'sqlite',
    storage: 'database.sqlite'
  })
}
