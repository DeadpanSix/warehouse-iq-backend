import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Status = sequelize.define('Status', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  description: {
    type: DataTypes.STRING(15),
    allowNull: false
  }
}, {
  tableName: 'status',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['description']
    }
  ]
});

export default Status;
