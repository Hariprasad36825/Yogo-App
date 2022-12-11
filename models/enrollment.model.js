import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db_config'
import { Batch } from './batch.model'
import { User } from './user.model'

export const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    defaultValue: 1
  },
  user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  batch: {
    type: DataTypes.INTEGER,
    references: {
      model: Batch,
      key: 'id'
    }
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
