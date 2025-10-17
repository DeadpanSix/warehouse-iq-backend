import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import Products from './Products.js';

const HistoricalPrice = sequelize.define('HistoricalPrice', {
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
  old_price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  new_price: {
    type: DataTypes.DECIMAL(10,2),
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
  tableName: 'historical_price',
  timestamps: false
});

HistoricalPrice.belongsTo(Products, { foreignKey: 'product_id', as: 'product' });

export default HistoricalPrice;
