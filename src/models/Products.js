import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Products = sequelize.define(
  'Products',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    brand_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    sku: {
      type: DataTypes.CHAR(6),
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [6, 6],
        min: 100000,
        max: 999999,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 1 },
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
  },
  {
    tableName: 'products',
    timestamps: true,
    paranoid: false,
  }
);

export default Products;
