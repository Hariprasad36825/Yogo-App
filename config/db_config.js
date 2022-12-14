import dotenv from 'dotenv'
import Sequelize from 'sequelize'
dotenv.config()

const env = process.env.NODE_ENV
const host = process.env.host

export let sequelize

if (env === 'test') {
  sequelize = new Sequelize('sqlite::memory')
} else {
  sequelize = new Sequelize(host)
}
