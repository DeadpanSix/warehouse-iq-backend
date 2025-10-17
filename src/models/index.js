import sequelize from '../db/connection.js'
import Products from './Products.js';
import ProductBrands from './ProductBrands.js';
import Status from './Status.js';
import ChangeLog from './ChangeLog.js';
import HistoricalPrice from './HistoricalPrice.js';
import ProductActionType from './ProductActionType.js';

// Associations
Products.belongsTo(ProductBrands, { foreignKey: 'brand_id', as: 'brand' });
Products.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });
Products.hasMany(HistoricalPrice, { foreignKey: 'product_id', as: 'historicalPrices' });
Products.hasMany(ChangeLog, { foreignKey: 'product_id', as: 'changeLogs' });

HistoricalPrice.belongsTo(Products, { foreignKey: 'product_id', as: 'product' });

ChangeLog.belongsTo(Products, { foreignKey: 'product_id', as: 'product' });
ChangeLog.belongsTo(ProductActionType, { foreignKey: 'action_type_id', as: 'actionType' });

export {
  sequelize,
  Products,
  ProductBrands,
  Status,
  ChangeLog,
  HistoricalPrice,
  ProductActionType
};
