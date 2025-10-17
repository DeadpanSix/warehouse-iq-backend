import sequelize from '../db/connection.js'
import Products from './Products.js';
import ProductBrands from './ProductBrands.js';
import Status from './Status.js';
import ChangeLog from './ChangeLog.js';
import HistoricalPrice from './HistoricalPrice.js';
import ProductActionType from './ProductActionType.js';

export {
  sequelize,
  Products,
  ProductBrands,
  Status,
  ChangeLog,
  HistoricalPrice,
  ProductActionType
};
