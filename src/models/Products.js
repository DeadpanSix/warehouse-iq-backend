import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import Status from './Status.js';
import ProductBrands from './ProductBrands.js';

const Products = sequelize.define('Products', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  brand_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: ProductBrands, key: 'id' }
  },
  status_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Status, key: 'id' }
  },
  description: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  sku: {
    type: DataTypes.CHAR(6),
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: true,
      len: [6,6],
      min: 100000,
      max: 999999
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 1 }
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 }
  }
}, {
  tableName: 'products',
  timestamps: true,
  paranoid: false
});

Products.belongsTo(ProductBrands, { foreignKey: 'brand_id', as: 'brand' });
Products.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });

export default Products;
