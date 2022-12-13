import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db_config'

export const Batch = sequelize.define('Batch', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  timing: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fee: {
    type: DataTypes.INTEGER,
    defaultValue: 500
  }
})
