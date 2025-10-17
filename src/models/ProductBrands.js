import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const ProductBrands = sequelize.define('ProductBrands', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  description: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'product_brands',
  timestamps: false
});

export default ProductBrands;
