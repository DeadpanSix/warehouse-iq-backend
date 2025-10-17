import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const ProductActionType = sequelize.define('ProductActionType', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  description: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'product_action_type',
  timestamps: false
});

export default ProductActionType;
