import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import ProductActionType from './ProductActionType.js';
import Products from './Products.js';

const ChangeLog = sequelize.define('ChangeLog', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Products, key: 'id' }
  },
  action_type_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: ProductActionType, key: 'id' }
  },
  previous_value: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  new_value: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  changed_by: {
    type: DataTypes.UUID,
    allowNull: true
  },
  changed_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'change_log',
  timestamps: false
});

ChangeLog.belongsTo(Products, { foreignKey: 'product_id', as: 'product' });
ChangeLog.belongsTo(ProductActionType, { foreignKey: 'action_type_id', as: 'actionType' });

export default ChangeLog;
