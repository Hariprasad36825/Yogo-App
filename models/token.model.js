import { DataTypes } from 'sequelize';
import { sequelize } from "../config/db_config";
import { User } from './user.model';

export const Token = sequelize.define('Token', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
})

